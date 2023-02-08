import { Table, Button } from "rsuite";
import { useGetUsers } from "./useUserData";

const { Column, HeaderCell, Cell } = Table;

const UTS = () => {
  const { data } = useGetUsers();

  console.log(data);

  return (
    <Table
      height={400}
      // data={data}
      // onRowClick={(rowData) => {
      //   console.log(rowData);
      // }}
    >
      {data?.data?.map((user) => (
        <Column key={user._id} width={60} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey={user.name} />
        </Column>
      ))}
      {/* <Column width={150}>
        <HeaderCell>Postcode</HeaderCell>
        <Cell dataKey="postcode" />
      </Column>

      <Column width={300}>
        <HeaderCell>Email</HeaderCell>
        <Cell dataKey="email" />
      </Column> */}
      <Column width={80} fixed="right">
        <HeaderCell>...</HeaderCell>

        <Cell style={{ padding: "6px" }}>
          {(rowData) => (
            <Button appearance="link" onClick={() => alert(`id:${rowData.id}`)}>
              Edit
            </Button>
          )}
        </Cell>
      </Column>
    </Table>
  );
};

export default UTS;
