function Schema({data}:{data:object}) {
  return (
      <script type="application/ld+json">
         {JSON.stringify(data , null, 2)}
      </script>
  )
}
export  { Schema };