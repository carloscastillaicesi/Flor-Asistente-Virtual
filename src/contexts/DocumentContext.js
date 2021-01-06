import React, { createContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
export const DocumentContext = createContext();


const DocumentContextProvider = (props) => {

 const [documents, setstate] = useState();
 const [documentStatus, setdocumentStatus] = useState();

 const fetchDocuments = async () => {
  const res = await fetch("/map/documents", {
   crossDomain: true
  })

  return res.json();
 }
 const documentsQuery = useQuery('documents', fetchDocuments);

 useEffect(() => {

  if (documentsQuery.status === "success") {
   setstate(documentsQuery.data);
  }
  setdocumentStatus(documentsQuery.status);
  console.log("documents", documents)
  console.log("documentStatus", documentStatus)
 }, [documentsQuery, documents, documentStatus])

 return (
  <DocumentContext.Provider value={{ documents, documentStatus }}>
   {props.children}
  </DocumentContext.Provider>
 )

}

export default DocumentContextProvider
