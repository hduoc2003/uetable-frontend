export default function AdminNavBar() {
    // const {context, setContext} = useGlobalContext()
    return (
     <div className="w-[300px] flex flex-col">
        <div className="flex w-full bg-white rounded px-8 py-4">
            <a href="/admin/users">
                User
            </a>
        </div>

        <div className="flex w-full">
            <a href="/admin/reports">
                Report
            </a>
        </div>
        
     </div>
    )
  }
  