import Job from "./Job"


const Jobs = ({jobs})=>{
    if(!jobs) return null

    return(
        <>
        {jobs.map((job, Index)=>(
            <Job key={Index} job={job} />
        ))}
        </>
    )
}
export default Jobs