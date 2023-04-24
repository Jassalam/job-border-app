import Job from "./Job"


const Jobs = ({jobs, isDashboard})=>{
    if(!jobs) return null

    return(
        <>
        {jobs.map((job, Index)=>(
            <Job key={Index} job={job} isDashboard= {isDashboard}/>
        ))}
        </>
    )
}
export default Jobs