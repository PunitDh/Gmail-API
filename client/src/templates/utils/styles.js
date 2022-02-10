import styled from "@emotion/styled";

export const Table = styled.table({
  minWidth: "80vw",
  marginLeft: "0.5rem",
  borderCollapse: "collapse",
  fontSize: "0.8rem",
});

export const TableRow = styled.tr({
  borderBottom: "1px solid #ccc",
  cursor: "pointer",
  width: "100%",
});

export const TableHead = styled.tr({
  fontWeight: "bold",
  borderBottom: "3px solid rgba(0,0,0,0.3)",
  width: "100%",
});

export const TableCheckboxCell = styled.td({
  width: "5%",
  marginRight: "1rem",
});

export const TableHeadCell = styled.td({
  cursor: "pointer",
  margin: "auto",
});

export const TableCell = styled.td({
  height: "100%",
  margin: "auto",
});

export const EmailsContainer = styled.div({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  width: "80vw",
});

export const LoadingBarContainer = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});
