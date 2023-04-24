import prisma from "@/lib/prisma"
import Jobs from "./components/Jobs"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { getJobs, getUser } from "@/lib/data"
import { authOptions } from "./api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import Link from "next/link"



export default function Index({jobs, user}) {
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
      {session && (
        <div className="mx-auto text-center">
          <p className="mb-10 text-2xl font-normal">
            Welcome, {user.name}
            {user.company && (
              <span className="bg-black text-white uppercase text-sm p-2">
                Company
              </span>
            )}
          </p>
          {user.company ? (
            <>
            <Link href={`/new`}>
            <button
            className="border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black"
            >
              Click here to post a new post
            </button>
            </Link>
            <button
            className="ml-5 border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black"
            >
              See all the jobs you posted
            </button>
            </>
          ):(
            <>
            <button
            className="ml-5 border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black"
            >
              See all the jobs you applied to
            </button>
            </>

          )}
        </div>

      )}

     <Jobs jobs={jobs}/>
    </div>
  
    </main>
  )
}

export async function getServerSideProps(context){
  const session = await getServerSession(context.req, context.res, authOptions)
  
  let jobs = await getJobs(prisma)
  jobs = JSON.parse(JSON.stringify(jobs))

  if(!session){
    return{
      props: {jobs},
    }
  }

  let user = await getUser(session.user.id, prisma)
  user = JSON.parse(JSON.stringify(user))

  return{
    props: {
      jobs,
      user,
    },
  }
}
