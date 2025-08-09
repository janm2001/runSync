import {
  Button,
  Dialog,
  Input,
  Field,
  Flex,
  IconButton,
  Portal,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export interface Record {
  id: string;
  time: string;
  date: string;
  title: string;
  improvement: string;
}

interface RecordCrudDialogProps {
  isOpen: boolean;
  onClose: () => void;
  records: Record[];
  editingRecord?: Record | null;
  onSave: (records: Record[]) => void;
}

const RecordCrudDialog = ({
  isOpen,
  onClose,
  records,
  editingRecord,
  onSave,
}: RecordCrudDialogProps) => {
  const [localRecords, setLocalRecords] = useState<Record[]>(records);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setLocalRecords(records);
    if (editingRecord) {
      setEditingId(editingRecord.id);
    }
  }, [records, editingRecord]);

  const handleAdd = () => {
    const newRecord: Record = {
      id: Date.now().toString(),
      time: "",
      date: new Date().toISOString().split("T")[0],
      title: "",
      improvement: "",
    };
    setLocalRecords([...localRecords, newRecord]);
    setEditingId(newRecord.id);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleDelete = (id: string) => {
    setLocalRecords(localRecords.filter((record) => record.id !== id));
  };

  const handleUpdate = (id: string, field: keyof Record, value: string) => {
    setLocalRecords(
      localRecords.map((record) =>
        record.id === id ? { ...record, [field]: value } : record
      )
    );
  };

  const handleSave = () => {
    onSave(localRecords);
    setEditingId(null);
    onClose();
  };

  return (
    <Portal>
      <Dialog.Root open={isOpen} onOpenChange={onClose}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Manage Personal Records</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Flex direction="column" gap={4}>
                <Button onClick={handleAdd} colorScheme="green" size="sm">
                  <FaPlus /> Add Record
                </Button>
                {localRecords.map((record) => (
                  <Flex
                    key={record.id}
                    p={3}
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    gap={2}
                  >
                    <Flex direction="column" flex={1} gap={2}>
                      {editingId === record.id ? (
                        <>
                          <Field.Root>
                            <Field.Label>Title</Field.Label>
                            <Input
                              value={record.title}
                              onChange={(e) =>
                                handleUpdate(record.id, "title", e.target.value)
                              }
                            />
                          </Field.Root>
                          <Field.Root>
                            <Field.Label>Time</Field.Label>
                            <Input
                              value={record.time}
                              onChange={(e) =>
                                handleUpdate(record.id, "time", e.target.value)
                              }
                            />
                          </Field.Root>
                          <Field.Root>
                            <Field.Label>Date</Field.Label>
                            <Input
                              type="date"
                              value={record.date}
                              onChange={(e) =>
                                handleUpdate(record.id, "date", e.target.value)
                              }
                            />
                          </Field.Root>
                          <Field.Root>
                            <Field.Label>Improvement</Field.Label>
                            <Input
                              value={record.improvement}
                              onChange={(e) =>
                                handleUpdate(
                                  record.id,
                                  "improvement",
                                  e.target.value
                                )
                              }
                            />
                          </Field.Root>
                          <Button size="sm" onClick={() => setEditingId(null)}>
                            Done
                          </Button>
                        </>
                      ) : (
                        <>
                          <div>
                            <strong>{record.title}</strong>
                          </div>
                          <div>Time: {record.time}</div>
                          <div>Date: {record.date}</div>
                          <div>Improvement: {record.improvement}</div>
                        </>
                      )}
                    </Flex>
                    <Flex direction="column" gap={2}>
                      <IconButton
                        size="sm"
                        aria-label="Edit"
                        onClick={() => handleEdit(record.id)}
                      >
                        <FaEdit />
                      </IconButton>
                      <IconButton
                        size="sm"
                        colorScheme="red"
                        aria-label="Delete"
                        onClick={() => handleDelete(record.id)}
                      >
                        <FaTrash />
                      </IconButton>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleSave}>
                Save Changes
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Portal>
  );
};

export default RecordCrudDialog;
