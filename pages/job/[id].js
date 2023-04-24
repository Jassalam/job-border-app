export default function Job(){

    return(
        <p>Single job</p>
    )
}

export async function getServerSideProps(context){
    console.log(context.params.id)

    return{ props: {}}
}