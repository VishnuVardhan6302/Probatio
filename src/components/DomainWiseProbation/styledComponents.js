import styled from "styled-components";


export const Page = styled.div`
  min-height: 100vh;
  padding: 30px;
 color:  #064e3b;
  margin-left:250px;

`;


// ==========================================
// HEADER
// ==========================================

export const PageHeader = styled.div`
  margin-bottom: 25px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 28px;
 color:  #064e3b;
`;

export const Description = styled.p`
  margin-top: 8px;
  color:  #064e3b;
  font-size: 14px;
`;


// ==========================================
// MAIN LAYOUT
// ==========================================

export const MainLayout = styled.div`
  display: grid;

  grid-template-columns: 280px 1fr;

  gap: 20px;

  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;


// ==========================================
// DOMAIN PANEL
// ==========================================

export const DomainPanel = styled.div`
  background: white;

  border: 1px solid #e2e8f0;

  border-radius: 12px;

  overflow: hidden;

  position: sticky;

  top: 20px;
`;

export const DomainHeader = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 18px 20px;

  border-bottom: 1px solid #e2e8f0;

 color:  #064e3b;

  font-size: 13px;
`;

export const DomainTitle = styled.h2`
  margin: 0;

  color:  #064e3b;

  font-size: 18px;
`;

export const DomainList = styled.div`
  padding: 8px;
`;


// ==========================================
// DOMAIN ITEM
// ==========================================

export const DomainItem = styled.button`
  width: 100%;

  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 14px;

  margin-bottom: 5px;

  border: none;

  border-radius: 8px;

  cursor: pointer;

  text-align: left;

  background: ${({ $active }) =>
    $active ? "#eff6ff" : "transparent"};

  color: ${({ $active }) =>
    $active ? " #064e3b" : "#334155"};

  &:hover {
    background: #eff6ff;

    color: #2563eb;
  }
`;

export const DomainName = styled.div`
  font-size: 14px;

  font-weight: 600;
`;

export const DomainCount = styled.div`
  margin-top: 5px;
 color:  #064e3b;
  font-size: 12px;
`;


// ==========================================
// CONTENT
// ==========================================

export const ContentPanel = styled.div`
  min-width: 0;

  background: white;

  border: 1px solid #e2e8f0;

  border-radius: 12px;

  overflow: hidden;
`;

export const ContentHeader = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 20px;

  padding: 20px;

  border-bottom: 1px solid #e2e8f0;

  @media (max-width: 700px) {
    flex-direction: column;

    align-items: stretch;
  }
`;

export const SelectedDomain = styled.h2`
  margin: 0;

  font-size: 20px;
 color:  #064e3b;
`;

export const SelectedDomainCount = styled.p`
  margin: 6px 0 0;

  color: #64748b;

  font-size: 13px;
`;


// ==========================================
// SEARCH
// ==========================================

export const SearchInput = styled.input`
  width: 260px;

  padding: 11px 14px;

  border: 1px solid #cbd5e1;

  border-radius: 8px;

  outline: none;

  font-size: 14px;

  &:focus {
    border-color: #2563eb;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;


// ==========================================
// SUMMARY
// ==========================================

export const SummaryGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 12px;

  padding: 20px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const SummaryCard = styled.div`
  padding: 16px;

  background: #f8fafc;

  border: 1px solid #e2e8f0;

  border-radius: 10px;
`;

export const SummaryLabel = styled.p`
  margin: 0 0 8px;

  color: #64748b;

  font-size: 12px;
`;

export const SummaryValue = styled.h3`
  margin: 0;

  color:  #064e3b;
  font-size: 24px;
`;


// ==========================================
// TABLE
// ==========================================

export const TableWrapper = styled.div`
  width: 100%;

  overflow-x: auto;

  border-top: 1px solid #e2e8f0;
`;

export const Table = styled.table`
  width: 100%;

  min-width: 700px;

  border-collapse: collapse;
`;

export const Th = styled.th`
  padding: 14px 20px;

  text-align: left;

  background: #f8fafc;

  color: #64748b;

  font-size: 12px;

  text-transform: uppercase;
`;

export const Td = styled.td`
  padding: 17px 20px;

  border-top: 1px solid #f1f5f9;

  color:  #064e3b;

  font-size: 14px;
`;


// ==========================================
// EMPLOYEE
// ==========================================

export const EmployeeName = styled.div`
  margin-bottom: 5px;
 color:  #064e3b;

  font-weight: 600;
`;

export const EmployeeId = styled.div`
  color: #94a3b8;

  font-size: 12px;
`;


// ==========================================
// STATUS
// ==========================================

export const StatusBadge = styled.span`
  display: inline-block;

  padding: 6px 11px;

  border-radius: 20px;

  font-size: 12px;

  font-weight: 600;

  background: ${({ $status }) => {
    if ($status === "Completed") {
      return "#dcfce7";
    }

    if ($status === "Under Review") {
      return "#fef3c7";
    }

    if ($status === "Extended") {
      return "#f3e8ff";
    }

    return "#dbeafe";
  }};

  color: ${({ $status }) => {
    if ($status === "Completed") {
      return "#166534";
    }

    if ($status === "Under Review") {
      return "#92400e";
    }

    if ($status === "Extended") {
      return "#7e22ce";
    }

    return "#1d4ed8";
  }};
`;


// ==========================================
// EMPTY
// ==========================================

export const EmptyMessage = styled.div`
  padding: 60px 20px;

  text-align: center;

  color: #64748b;

  font-size: 14px;
`;