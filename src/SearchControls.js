import { useState, useEffect } from "react"
import data from "./data"

export default function SearchControls(props) {
  const [colNumFilter, setColNumFilter] = useState(0) //for selecting column index
  const [srchStr, setSrchStr] = useState("") //text string of col
  const [multiColState, setMultiColState] = useState([0, 1])
  const [multiSrchStr, setMultiSrchStr] = useState("") //text string of col
  const [tableSrchStr, setTableSrchStr] = useState("") //text string of Table Search

  //   Destructuring passed functions in props
  const { setTableData } = props

  //   Hook for searching complete table
  useEffect(() => {
    // searchMultiCol(data, multiColState)
    searchTable(data, tableSrchStr)
    // can add additional dependancy of colNumChange
  }, [tableSrchStr])

  //   Hook for searching only for particular column
  useEffect(() => {
    searchCol(data, colNumFilter)
    // searchMultiCol(data, multiColState)
    // searchTable(data, tableSrchStr)
    // can add additional dependancy of colNumChange
  }, [srchStr, colNumFilter])

  //   Hook for searching multiple columns

  useEffect(() => {
    //
    searchMultiCol(data, multiColState)
  }, [multiSrchStr, multiColState])

  // function  definitions

  function searchCol(tableRows, colNum) {
    // var tableRows = data
    const filteredData = tableRows.filter((row) => {
      const rowCellValue = row[colNum]
      return partialMatch(srchStr, rowCellValue)
    })
    setTableData(filteredData)
  }

  function theadNameToIndex() {
    //   This util function will take up the headers of table and convert the headerName to columnIndex
  }

  function searchMultiCol(rows, multiColState) {
    //   check carried for Empty array by checking length
    if (multiColState.length) {
      console.log(multiColState)
      console.log(multiColState.length)
      let filteredData = rows.filter((row) =>
        // check for particular cols in this row, if they include data
        multiColState.some((cellIndex) => {
          const cellValue = row[cellIndex]
          return partialMatch(multiSrchStr, cellValue)
        })
      )
      // recursion, closure, while loop
      setTableData(filteredData)
    } else {
      return
    }
  }

  function searchTable(rows, srchStr) {
    //   Full table will be searched against the text string
    // ///////////////////////////
    // Approach 1
    /////////////////////////////

    // If there is any filters need to be applied, it will need different approach

    // Table is a collection of row, i.e rows Array
    // Approach should be taken for single pass of the data
    let filteredData = rows.filter((row) =>
      // check for particular cols in this row, if they include data
      row.some((cellValue) => partialMatch(srchStr, cellValue))
    )
    // recursion, closure, while loop
    setTableData(filteredData)

    // ///////////////////////////
    // Approach 2
    /////////////////////////////
  }

  //   UTIL functions
  //   partialMatch is a helper function
  function partialMatch(srchStr, rowCellValue) {
    var srchStrNorm = srchStr.trim().toUpperCase()
    var isMatched = rowCellValue.toUpperCase().indexOf(srchStrNorm) > -1
    return isMatched
  }

  // Event Handler functions
  function handleColChange(e) {
    e.preventDefault()
    const target = e.target
    setColNumFilter(target.value)
  }
  function handleColSearch(e) {
    e.preventDefault()
    const target = e.target
    setSrchStr(target.value)
  }
  function handleTableSearch(e) {
    e.preventDefault()
    const target = e.target
    setTableSrchStr(target.value)
  }
  function handleMultiColSearch(e) {
    e.preventDefault()
    const target = e.target
    //check value for Empty string
    setMultiSrchStr(target.value)
  }
  function handleMultiColState(e) {
    //
    e.preventDefault()
    const target = e.target
    // needs rework for trainling spaces
    const value = target.value.split(",")
    const state = value.filter((el) => el !== "")
    setMultiColState(state)
  }

  //   JSX here

  return (
    <>
      <input
        type='text'
        name='searchCol'
        id='searchCol'
        placeholder='Search Column'
        value={srchStr}
        onChange={(e) => handleColSearch(e)}
      />
      <select name='colName' id='colName' onChange={(e) => handleColChange(e)}>
        {props.headers.map((el, i) => (
          <option value={i} key={i}>
            {el}
          </option>
        ))}
      </select>
      <input
        type='text'
        name='search'
        id='search'
        placeholder='Search Table'
        value={tableSrchStr}
        onChange={(e) => handleTableSearch(e)}
      />
      <input
        type='text'
        name='multiColState'
        id='multiColState'
        placeholder='Search Multi columns - comma separated Indexes'
        value={multiColState.join(",")}
        onChange={(e) => handleMultiColState(e)}
        style={{ width: "300px" }}
      />
      <input
        type='text'
        name='multiColSearch'
        id='multiColSearch'
        placeholder='Search Multi columns - comma separated Indexes'
        value={multiSrchStr}
        onChange={(e) => handleMultiColSearch(e)}
        style={{ width: "300px" }}
      />
    </>
  )
}
