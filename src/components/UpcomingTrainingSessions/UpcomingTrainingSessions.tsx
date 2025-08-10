import {
  Button,
  Card,
  EmptyState,
  Flex,
  Icon,
  SkeletonText,
  VStack,
} from "@chakra-ui/react";
import { FaCalendar, FaFilePdf, FaPrint } from "react-icons/fa";
import TrainingSession from "../TrainingSessionCard/TrainingSession";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Training } from "@/data/dummyData";
import { HiColorSwatch } from "react-icons/hi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

// Add type declaration for jsPDF with autoTable
interface AutoTableOptions {
  head: string[][];
  body: string[][];
  startY: number;
  styles: { fontSize: number };
  headStyles: { fillColor: number[] };
  columnStyles: Record<number, { cellWidth: number }>;
}

interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: AutoTableOptions) => void;
  lastAutoTable: {
    finalY: number;
  };
}

const UpcomingTrainingSessions = () => {
  const [trainingSessions, setTrainingSessions] = useState<Training[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchTrainingSessions = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    axios
      .get(`${apiUrl}/trainings`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setTrainingSessions(response.data as Training[]);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((error) => {
        console.error("Error fetching training sessions:", error);
        setIsLoading(false);
        setIsError(true);
      });
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    const worksheetData = [
      ["#", "Title", "Date", "Duration", "Type", "Description"],
      ...trainingSessions.map((session, index) => [
        index + 1,
        session.title || "N/A",
        session.date || "N/A",
        session.duration || "N/A",
        session.type || "N/A",
        session.description || "N/A",
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Training Sessions");

    XLSX.writeFile(
      workbook,
      `training-sessions-${new Date().toISOString().split("T")[0]}.xlsx`
    );
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Title
    doc.setFontSize(20);
    doc.text("Training Sessions Report", pageWidth / 2, 20, {
      align: "center",
    });

    // Date
    doc.setFontSize(10);
    doc.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      30,
      { align: "center" }
    );

    // Summary
    doc.setFontSize(14);
    doc.text("Summary", 20, 45);
    doc.setFontSize(10);
    doc.text(`Total Training Sessions: ${trainingSessions.length}`, 20, 55);

    // Training sessions table
    const tableData = trainingSessions.map((session, index) => [
      (index + 1).toString(),
      session.title || "N/A",
      session.date || "N/A",
      session.duration || "N/A",
      session.type || "N/A",
      session.description || "N/A",
    ]);

    autoTable(doc, {
      head: [["#", "Title", "Date", "Duration", "Type", "Description"]],
      body: tableData,
      startY: 65,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185] },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 40 },
        2: { cellWidth: 30 },
        3: { cellWidth: 25 },
        4: { cellWidth: 25 },
        5: { cellWidth: 50 },
      },
    });

    // Footer
    const finalY = (doc as jsPDFWithAutoTable).lastAutoTable.finalY + 20;
    doc.setFontSize(8);
    doc.text("RunSync Training Management System", pageWidth / 2, finalY, {
      align: "center",
    });

    // Save the PDF
    doc.save(
      `training-sessions-report-${new Date().toISOString().split("T")[0]}.pdf`
    );
  };

  const printReport = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Training Sessions Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { text-align: center; color: #333; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; font-weight: bold; }
              .summary { margin: 20px 0; }
              @media print { 
                body { margin: 0; } 
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <h1>Training Sessions Report</h1>
            <p style="text-align: center;">Generated on: ${new Date().toLocaleDateString()}</p>
            <div class="summary">
              <strong>Total Training Sessions: ${
                trainingSessions.length
              }</strong>
            </div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Duration</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                ${trainingSessions
                  .map(
                    (session, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${session.title || "N/A"}</td>
                    <td>${session.date || "N/A"}</td>
                    <td>${session.duration || "N/A"}</td>
                    <td>${session.type || "N/A"}</td>
                    <td>${session.description || "N/A"}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  useEffect(() => {
    fetchTrainingSessions();
  }, []);
  if (isError) {
    return (
      <Card.Root p={2}>
        <Card.Header>
          <Flex justify="space-between" align="center">
            <Card.Title alignItems={"center"} display="flex" gap={2}>
              <Icon size={"lg"}>
                <FaCalendar />
              </Icon>{" "}
              Training Sessions Report
            </Card.Title>
            <Flex gap={2}>
              <Button size="sm" variant="outline" onClick={exportToExcel}>
                📊 Export Excel
              </Button>
              <Button size="sm" variant="outline" onClick={printReport}>
                <FaPrint /> Print
              </Button>
              <Button size="sm" colorScheme="red" onClick={generatePDFReport}>
                <FaFilePdf /> Export PDF
              </Button>
            </Flex>
          </Flex>
        </Card.Header>
        <EmptyState.Root>
          <EmptyState.Content>
            <EmptyState.Indicator>
              <HiColorSwatch />
            </EmptyState.Indicator>
            <VStack textAlign="center">
              <EmptyState.Title>No Data Found</EmptyState.Title>
            </VStack>
          </EmptyState.Content>
        </EmptyState.Root>
      </Card.Root>
    );
  }
  return (
    <Card.Root p={2} mt={4}>
      {isLoading ? (
        <SkeletonText noOfLines={4} gap="4" mt="4" />
      ) : (
        <>
          <Card.Header>
            <Flex justify="space-between" align="center">
              <Card.Title alignItems={"center"} display="flex" gap={2}>
                <Icon size={"lg"}>
                  <FaCalendar />
                </Icon>{" "}
                Training Sessions Report
              </Card.Title>
              <Flex gap={2}>
                <Button size="sm" variant="outline" onClick={exportToExcel}>
                  📊 Export Excel
                </Button>
                <Button size="sm" variant="outline" onClick={printReport}>
                  <FaPrint /> Print
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  variant="outline"
                  onClick={generatePDFReport}
                >
                  <FaFilePdf /> Export PDF
                </Button>
              </Flex>
            </Flex>
          </Card.Header>
          <Card.Body>
            {trainingSessions.length > 0 &&
              trainingSessions.map((session) => (
                <TrainingSession
                  key={session.id}
                  session={session}
                  fetchTrainingSessions={fetchTrainingSessions}
                />
              ))}
          </Card.Body>
        </>
      )}
    </Card.Root>
  );
};

export default UpcomingTrainingSessions;
