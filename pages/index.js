import prisma from "@/lib/prisma"
import { getJobs } from 'lib/data.js'
import Jobs from "./components/Jobs"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"




export default function Index({jobs}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  if( session && !session.user.name){
    router.push('/setup')
  }


  return (
    <main
      className='first-letter:flex min-h-screen flex-col items-center justify-between p-24'
    >
       <div className='mt-10'>
      <div className='text-center p-4 m-4'>
        <h2 className='mb-10 text-4xl font-bold'>Find a job!</h2>
      </div>
      {!session && (
        <a
        className="flex justify-center w-24 px-8 py-2 mx-auto font-bold text-white bg-black border border-black rounded-full"
        href='/api/auth/signin'>
          Login
        </a>
      )}
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
