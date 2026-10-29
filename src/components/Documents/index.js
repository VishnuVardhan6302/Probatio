
import React, { useState } from "react";
import {
  PageContainer,
  Header,
  TitleSection,
  Title,
  Subtitle,
  Actions,
  UploadButton,
  Toolbar,
  SearchInput,
  FilterSelect,
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  StatusBadge,
  ActionButton,
  EmptyMessage,
  ModalOverlay,
  Modal,
  ModalTitle,
  FormGroup,
  Label,
  Input,
  Select,
  ModalActions,
  CancelButton,
  SubmitButton,
} from "./styledComponents";

import Dashboard from "../Dashboard";
import NavSection from "../NavSection";
const initialDocuments = [
  {
    id: 1,
    employeeName: "Rahul Kumar",
    documentName: "Aadhar Card",
    documentType: "Identity Proof",
    uploadDate: "02 Oct 2026",
    status: "Verified",
  },
  {
    id: 2,
    employeeName: "Priya Sharma",
    documentName: "PAN Card",
    documentType: "Identity Proof",
    uploadDate: "01 Oct 2026",
    status: "Verified",
  },
  {
    id: 3,
    employeeName: "Arun Kumar",
    documentName: "Degree Certificate",
    documentType: "Education",
    uploadDate: "29 Sep 2026",
    status: "Pending",
  },
  {
    id: 4,
    employeeName: "Sneha Reddy",
    documentName: "Experience Letter",
    documentType: "Employment",
    uploadDate: "27 Sep 2026",
    status: "Verified",
  },
  {
    id: 5,
    employeeName: "Vijay Kumar",
    documentName: "Address Proof",
    documentType: "Address Proof",
    uploadDate: "25 Sep 2026",
    status: "Rejected",
  },
];

const Documents = () => {
  const [documents, setDocuments] = useState(initialDocuments);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    employeeName: "",
    documentName: "",
    documentType: "Identity Proof",
    file: null,
  });

  const filteredDocuments = documents.filter((document) => {
    const matchesSearch =
      document.employeeName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      document.documentName
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || document.documentType === filter;

    return matchesSearch && matchesFilter;
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUpload = (event) => {
    event.preventDefault();

    if (
      !formData.employeeName ||
      !formData.documentName ||
      !formData.file
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const newDocument = {
      id: Date.now(),
      employeeName: formData.employeeName,
      documentName: formData.documentName,
      documentType: formData.documentType,
      uploadDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Pending",
    };

    setDocuments((prev) => [newDocument, ...prev]);

    setFormData({
      employeeName: "",
      documentName: "",
      documentType: "Identity Proof",
      file: null,
    });

    setShowModal(false);

    alert("Document uploaded successfully.");
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmDelete) return;

    setDocuments((prev) =>
      prev.filter((document) => document.id !== id)
    );
  };

  const handleView = (document) => {
    alert(
      `Viewing ${document.documentName} of ${document.employeeName}`
    );
  };

  const handleDownload = (document) => {
    alert(`Downloading ${document.documentName}`);
  };

  return (
    <PageContainer>
      <NavSection/>
      <Header>
        <TitleSection>
          <Title>Documents</Title>
          <Subtitle>
            Manage and track employee documents
          </Subtitle>
        </TitleSection>

        <Actions>
          <UploadButton onClick={() => setShowModal(true)}>
            + Upload Document
          </UploadButton>
        </Actions>
      </Header>

      <Toolbar>
        <SearchInput
          type="text"
          placeholder="Search employee or document..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <FilterSelect
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="All">All Documents</option>
          <option value="Identity Proof">Identity Proof</option>
          <option value="Education">Education</option>
          <option value="Employment">Employment</option>
          <option value="Address Proof">Address Proof</option>
        </FilterSelect>
      </Toolbar>

      <TableContainer>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Employee</TableHeader>
              <TableHeader>Document</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Upload Date</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </thead>

          <tbody>
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((document) => (
                <TableRow key={document.id}>
                  <TableCell>
                    <strong>{document.employeeName}</strong>
                  </TableCell>

                  <TableCell>
                    {document.documentName}
                  </TableCell>

                  <TableCell>
                    {document.documentType}
                  </TableCell>

                  <TableCell>
                    {document.uploadDate}
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={document.status}>
                      {document.status}
                    </StatusBadge>
                  </TableCell>

                  <TableCell>
                    <ActionButton
                      onClick={() => handleView(document)}
                    >
                      View
                    </ActionButton>

                    <ActionButton
                      onClick={() => handleDownload(document)}
                    >
                      Download
                    </ActionButton>

                    <ActionButton
                      danger
                      onClick={() => handleDelete(document.id)}
                    >
                      Delete
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6">
                  <EmptyMessage>
                    No documents found
                  </EmptyMessage>
                </TableCell>
              </TableRow>
            )}
          </tbody>
        </Table>
      </TableContainer>

      {showModal && (
        <ModalOverlay>
          <Modal>
            <ModalTitle>
              Upload Document
            </ModalTitle>

            <form onSubmit={handleUpload}>
              <FormGroup>
                <Label>Employee Name</Label>

                <Input
                  type="text"
                  name="employeeName"
                  placeholder="Enter employee name"
                  value={formData.employeeName}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>Document Name</Label>

                <Input
                  type="text"
                  name="documentName"
                  placeholder="Enter document name"
                  value={formData.documentName}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>Document Type</Label>

                <Select
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleChange}
                >
                  <option value="Identity Proof">
                    Identity Proof
                  </option>

                  <option value="Education">
                    Education
                  </option>

                  <option value="Employment">
                    Employment
                  </option>

                  <option value="Address Proof">
                    Address Proof
                  </option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Select File</Label>

                <Input
                  type="file"
                  name="file"
                  onChange={handleChange}
                />
              </FormGroup>

              <ModalActions>
                <CancelButton
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </CancelButton>

                <SubmitButton type="submit">
                  Upload
                </SubmitButton>
              </ModalActions>
            </form>
          </Modal>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default Documents;


