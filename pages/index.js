import prisma from "@/lib/prisma"
import { getJobs } from 'lib/data.js'
import Jobs from "./components/Jobs"





export default function Index({jobs}) {
  return (
    <main
      className='first-letter:flex min-h-screen flex-col items-center justify-between p-24'
    >
       <div className='mt-10'>
      <div className='text-center p-4 m-4'>
        <h2 className='mb-10 text-4xl font-bold'>Find a job!</h2>
      </div>
     <Jobs jobs={jobs}/>
    </div>
  
    </main>
  )
}

export async function getServerSideProps(context){
  
  let jobs = await getJobs(prisma)
  jobs = JSON.parse(JSON.stringify(jobs))

  return{
    props: {
      jobs,
    },
  }
}
