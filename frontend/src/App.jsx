import { useState } from "react"
import Layout from "./components/Layout"
import Dashboard from "./routes/Dashboard"
import SearchBar from "./components/SearchBar"

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  
  return (
    <Layout searchBar={<SearchBar value={searchTerm} onChange={setSearchTerm} />}>
      <Dashboard searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </Layout>
  )
}

export default App
