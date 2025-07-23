import { Head } from "@inertiajs/react";

function Schema({data}:{data:object}) {
  return (
     <Head>
       <script type="application/ld+json">
         {JSON.stringify(data , null, 2)}
      </script>
     </Head>
  )
}
export  { Schema };