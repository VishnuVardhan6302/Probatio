
import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 28px;
  background: #f8fafc;
  min-height: 100vh;
  margin-left:250px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const TitleSection = styled.div``;

export const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
`;

export const Subtitle = styled.p`
  margin: 7px 0 0;
  color: #64748b;
  font-size: 14px;
`;

export const AddButton = styled.button`
  border: none;
  background: #2563eb;
  color: white;
  padding: 11px 18px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`;

export const Toolbar = styled.div`
  margin-bottom: 22px;
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 12px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  background: white;

  &:focus {
    border-color: #2563eb;
  }
`;

export const DomainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const DomainCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);

  transition: 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
`;

export const DomainName = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #0f172a;
`;

export const DomainDescription = styled.p`
  margin: 8px 0 0;
  color: #64748b;
  font-size: 13px;
  line-height: 1.5;
`;

export const EmployeeBadge = styled.span`
  background: #eff6ff;
  color: #2563eb;
  padding: 5px 9px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
`;

export const EmployeeCount = styled.div`
  margin-top: 20px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 7px;
  color: #475569;
  font-size: 13px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 18px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

export const ViewButton = styled(Button)`
  background: #eff6ff;
  color: #2563eb;

  &:hover {
    background: #dbeafe;
  }
`;

export const EditButton = styled(Button)`
  background: #f1f5f9;
  color: #475569;

  &:hover {
    background: #e2e8f0;
  }
`;

export const DeleteButton = styled(Button)`
  background: #fef2f2;
  color: #dc2626;

  &:hover {
    background: #fee2e2;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;
  z-index: 1000;
`;

export const Modal = styled.div`
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;

  background: white;
  border-radius: 12px;
  padding: 25px;

  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.2);
`;

export const ModalTitle = styled.h2`
  margin: 0 0 22px;
  color: #0f172a;
  font-size: 21px;
`;

export const FormGroup = styled.div`
  margin-bottom: 18px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 7px;
  color: #334155;
  font-size: 13px;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;

  padding: 11px 12px;

  border: 1px solid #cbd5e1;
  border-radius: 7px;

  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #2563eb;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;

  padding: 11px 12px;

  border: 1px solid #cbd5e1;
  border-radius: 7px;

  outline: none;
  resize: vertical;

  font-family: inherit;
  font-size: 14px;

  &:focus {
    border-color: #2563eb;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 22px;
`;

export const CancelButton = styled.button`
  border: 1px solid #cbd5e1;
  background: white;
  color: #475569;

  padding: 9px 16px;
  border-radius: 7px;

  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #f8fafc;
  }
`;

export const SaveButton = styled.button`
  border: none;
  background: #2563eb;
  color: white;

  padding: 9px 16px;
  border-radius: 7px;

  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`;

export const EmployeeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const EmployeeItem = styled.div`
  padding: 13px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #f8fafc;
`;

export const EmployeeInfo = styled.div``;

export const EmployeeName = styled.div`
  color: #0f172a;
  font-size: 14px;
  font-weight: 600;
`;

export const EmployeeRole = styled.div`
  margin-top: 4px;
  color: #64748b;
  font-size: 12px;
`;

export const EmptyState = styled.div`
  padding: 40px;
  text-align: center;
  color: #64748b;
  background: white;
  border-radius: 10px;
  border: 1px dashed #cbd5e1;
`;