import React, { useState } from "react";
import styled from "styled-components";

import NavSection from "../NavSection";

const UploadDocuments = () => {
  const [formData, setFormData] = useState({
    employee: "",
    documentType: "",
    description: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  const employees = [
    { id: 1, name: "Rahul Sharma", employeeId: "EMP001" },
    { id: 2, name: "Priya Reddy", employeeId: "EMP002" },
    { id: 3, name: "Arjun Kumar", employeeId: "EMP003" },
    { id: 4, name: "Sneha Patel", employeeId: "EMP004" },
  ];

  const documentTypes = [
    "Aadhar Card",
    "PAN Card",
    "Resume",
    "Offer Letter",
    "Joining Letter",
    "Educational Certificate",
    "Experience Certificate",
    "Salary Slip",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.employee) {
      setMessage("Please select an employee.");
      return;
    }

    if (!formData.documentType) {
      setMessage("Please select a document type.");
      return;
    }

    if (!selectedFile) {
      setMessage("Please select a document to upload.");
      return;
    }

    // Mock upload
    console.log("Employee:", formData.employee);
    console.log("Document Type:", formData.documentType);
    console.log("Description:", formData.description);
    console.log("File:", selectedFile);

    setMessage("Document uploaded successfully!");

    // Reset form
    setFormData({
      employee: "",
      documentType: "",
      description: "",
    });

    setSelectedFile(null);

    document.getElementById("documentFile").value = "";
  };

  const handleCancel = () => {
    setFormData({
      employee: "",
      documentType: "",
      description: "",
    });

    setSelectedFile(null);
    setMessage("");

    const fileInput = document.getElementById("documentFile");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <PageContainer>
      <NavSection/>

      {/* Page Header */}
      <PageHeader>
        <div>
          <PageTitle>Upload Document</PageTitle>

          <PageSubtitle>
            Upload and manage employee documents
          </PageSubtitle>
        </div>
      </PageHeader>

      {/* Upload Card */}
      <UploadCard>

        <CardHeader>
          <CardTitle>Document Information</CardTitle>

          <CardDescription>
            Select an employee and upload the required document.
          </CardDescription>
        </CardHeader>

        <Form onSubmit={handleSubmit}>

          {/* Employee */}
          <FormGroup>
            <Label>
              Employee <Required>*</Required>
            </Label>

            <Select
              name="employee"
              value={formData.employee}
              onChange={handleChange}
            >
              <option value="">
                Select Employee
              </option>

              {employees.map((employee) => (
                <option
                  key={employee.id}
                  value={employee.employeeId}
                >
                  {employee.name} - {employee.employeeId}
                </option>
              ))}
            </Select>
          </FormGroup>

          {/* Document Type */}
          <FormGroup>
            <Label>
              Document Type <Required>*</Required>
            </Label>

            <Select
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
            >
              <option value="">
                Select Document Type
              </option>

              {documentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </FormGroup>

          {/* File Upload */}
          <FormGroup>
            <Label>
              Upload Document <Required>*</Required>
            </Label>

            <FileUploadBox>
              <UploadIcon>📄</UploadIcon>

              <UploadText>
                {selectedFile
                  ? selectedFile.name
                  : "Choose a document to upload"}
              </UploadText>

              <UploadHint>
                PDF, DOC, DOCX, JPG or PNG
              </UploadHint>

              <BrowseButton htmlFor="documentFile">
                Browse File
              </BrowseButton>

              <HiddenInput
                id="documentFile"
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
            </FileUploadBox>

            {selectedFile && (
              <SelectedFile>
                <FileName>
                  📎 {selectedFile.name}
                </FileName>

                <FileSize>
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </FileSize>
              </SelectedFile>
            )}
          </FormGroup>

          {/* Description */}
          <FormGroup>
            <Label>Description</Label>

            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter document description..."
              rows="4"
            />
          </FormGroup>

          {/* Message */}
          {message && (
            <Message
              success={message.includes("successfully")}
            >
              {message}
            </Message>
          )}

          {/* Buttons */}
          <ButtonContainer>

            <CancelButton
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </CancelButton>

            <UploadButton type="submit">
              Upload Document
            </UploadButton>

          </ButtonContainer>

        </Form>
      </UploadCard>
    </PageContainer>
  );
};

export default UploadDocuments;


/* =====================================================
   STYLED COMPONENTS
===================================================== */

const PageContainer = styled.div`
  padding: 30px;
  background: #f8fafc;
  min-height: 100vh;
  margin-left:250px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
`;

const PageSubtitle = styled.p`
  margin: 7px 0 0;
  color: #64748b;
  font-size: 14px;
`;

const UploadCard = styled.div`
  max-width: 850px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
`;

const CardHeader = styled.div`
  padding: 25px 30px;
  border-bottom: 1px solid #e2e8f0;
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  color: #1e293b;
`;

const CardDescription = styled.p`
  margin: 6px 0 0;
  color: #64748b;
  font-size: 14px;
`;

const Form = styled.form`
  padding: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 22px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #334155;
`;

const Required = styled.span`
  color: #ef4444;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 7px;
  font-size: 14px;
  color: #334155;
  background: #ffffff;
  outline: none;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 7px;
  font-size: 14px;
  color: #334155;
  resize: vertical;
  box-sizing: border-box;
  outline: none;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const FileUploadBox = styled.div`
  border: 2px dashed #cbd5e1;
  border-radius: 10px;
  padding: 35px;
  text-align: center;
  background: #f8fafc;
  transition: 0.2s;

  &:hover {
    border-color: #2563eb;
    background: #eff6ff;
  }
`;

const UploadIcon = styled.div`
  font-size: 38px;
  margin-bottom: 10px;
`;

const UploadText = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 6px;
`;

const UploadHint = styled.div`
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 18px;
`;

const BrowseButton = styled.label`
  display: inline-block;
  padding: 10px 20px;
  background: #2563eb;
  color: #ffffff;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const SelectedFile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 10px 12px;
  background: #f1f5f9;
  border-radius: 6px;
`;

const FileName = styled.span`
  font-size: 13px;
  color: #334155;
  font-weight: 500;
`;

const FileSize = styled.span`
  font-size: 12px;
  color: #64748b;
`;

const Message = styled.div`
  padding: 12px 15px;
  margin-bottom: 20px;
  border-radius: 6px;
  font-size: 14px;

  background: ${(props) =>
    props.success ? "#dcfce7" : "#fee2e2"};

  color: ${(props) =>
    props.success ? "#166534" : "#b91c1c"};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 10px;
`;

const CancelButton = styled.button`
  padding: 11px 22px;
  border: 1px solid #cbd5e1;
  background: #ffffff;
  color: #475569;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #f8fafc;
  }
`;

const UploadButton = styled.button`
  padding: 11px 22px;
  border: none;
  background: #2563eb;
  color: #ffffff;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`;