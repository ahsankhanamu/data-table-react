import { useState, useEffect } from "react"
import data from "./data"
import SearchControls from "./SearchControls"

function TableHeader(props) {
  return (
    <thead>
      <tr>
        {props.headers.map((el, i) => (
          <th scope='col' key={i}>
            {el}
          </th>
        ))}
      </tr>
    </thead>
  )
}

function TableFooter(props) {
  return (
    <thead>
      <tr>
        {props.headers.map((el, i) => (
          <th scope='col' key={i}>
            {el}
          </th>
        ))}
      </tr>
    </thead>
  )
}

function TableBody(props) {
  const { tableData } = props
  useEffect(() => {}, [tableData])
  return (
    <tbody>
      {props.tableData.map((el, i) => (
        <tr>
          {el.map((el, i) => (
            <td key={i + `x`}>{el}</td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

function Pagination() {
  //
}

function App() {
  // used to pass data to table body
  const [tableData, setTableData] = useState(data)

  return (
    <div className='App'>
      <SearchControls
        headers={["Name", "Last Name", "Occupation", "City", "Date", "Amount"]}
        setTableData={setTableData}
      />
      <table>
        <TableHeader
          headers={[
            "Name",
            "Last Name",
            "Occupation",
            "City",
            "Date",
            "Amount",
          ]}
        />
        <TableBody tableData={tableData} />
        <TableFooter
          headers={[
            "Name",
            "Last Name",
            "Occupation",
            "City",
            "Date",
            "Amount",
          ]}
        />
      </table>
    </div>
  )
}

export default App
