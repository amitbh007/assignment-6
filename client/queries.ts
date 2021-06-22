//get data
const getData = async ()=>{
  const res = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      query{
          getUsers{
          firstName
          lastName
          middleName
          role
          address
          phone
          email
        }
      }
        `,
    }),
  })
  const jsonRes = await res.json();
  console.log("thi sis it",jsonRes);
  return jsonRes
}

//update data
const updateData = async (email:string,newUser: any)=>{
  const res = await  fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      mutation updateUser($email:String!,$newUser:UserInputType!){
          updateUser(email:$email,newUser:$newUser){
              firstName
              lastName
              middleName
              role
              address
              phone
              email
          }
      }
        `,variables: {
          email,
          newUser
        }
    })
  })

    const jsonRes = await res.json();
    console.log("mtation",jsonRes)
    return jsonRes;
}
  
//delete data
const deleteData = async (email:string)=>{
    const res = await  fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        mutation deleteUser($email:String!){
            deleteUser(email:$email){
              firstName
              email
        }
        }
          `,variables: {
            email,
          }
      })
    })
  
    const jsonRes = await res.json();
    console.log("mtation",jsonRes)
    return jsonRes;
}