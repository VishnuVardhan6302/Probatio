
import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 28px;
   background:  #f8e7c9;
  color:  #064e3b;
  min-height: 100vh;
  margin-left:250px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const TitleSection = styled.div``;

export const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  color:  #064e3b;;
`;

export const Subtitle = styled.p`
  margin: 6px 0 0;
   color:  #064e3b;
  font-size: 14px;
`;

export const Actions = styled.div``;

export const UploadButton = styled.button`
  border: none;
  background: #2563eb;
  color: white;
  padding: 11px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background: #1d4ed8;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  gap: 14px;
  margin-bottom: 20px;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export const SearchInput = styled.input`
  width: 350px;
  padding: 11px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: #2563eb;
  }

  @media (max-width: 700px) {
    width: auto;
  }
`;

export const FilterSelect = styled.select`
  padding: 11px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: white;
  outline: none;
`;

export const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  overflow-x: auto;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 15px 16px;
  background: #f1f5f9;
  color:  #064e3b;
  font-size: 13px;
  font-weight: 600;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td`
  padding: 15px 16px;
   color:  #064e3b;
  font-size: 14px;
  vertical-align: middle;
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;

  background: ${(props) =>
    props.status === "Verified"
      ? "#dcfce7"
      : props.status === "Pending"
      ? "#fef3c7"
      : "#fee2e2"};

  color: ${(props) =>
    props.status === "Verified"
      ? "#15803d"
      : props.status === "Pending"
      ? "#b45309"
      : "#dc2626"};
`;

export const ActionButton = styled.button`
  border: none;
  background: transparent;
  color: ${(props) => (props.danger ? "#dc2626" : "#2563eb")};
  cursor: pointer;
  margin-right: 10px;
  font-size: 13px;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #64748b;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  width: 450px;
  max-width: 90%;
  background: white;
  padding: 28px;
  border-radius: 12px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
`;

export const ModalTitle = styled.h2`
  margin: 0 0 22px;
   color:  #064e3b;
`;

export const FormGroup = styled.div`
  margin-bottom: 18px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 7px;
   color:  #064e3b;
  font-size: 14px;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 11px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 7px;
  outline: none;

  &:focus {
    border-color: #2563eb;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 11px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 7px;
  background: white;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;
`;

export const CancelButton = styled.button`
  padding: 10px 18px;
  border: 1px solid #cbd5e1;
  background: white;
  color:  #064e3b;
  border-radius: 7px;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  padding: 10px 18px;
  border: none;
  background: #2563eb;
  color: white;
  border-radius: 7px;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`;