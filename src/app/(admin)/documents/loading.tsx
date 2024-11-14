const loading = () => {
    return <div>Loading documents...</div>;
  };
  
  export default loading;
  
//   'use client';

// import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { checkHeaders, cn, sleep } from '../utils';
// import { Breadcrumb, Table } from '@/components/custom-ui';
// import { Heading } from '@/components/ui/heading';
// import { EXCEL_FORMAT_HEADER, PROTECTED_ROUTES, ROLES } from '../constants';
// import { Separator } from '@/components/ui/separator';
// import { Session } from 'next-auth';
// import Select from 'react-select';
// import { getAllClients, getClientByUserId, getUserById } from '../prisma/queries/userQueriers';
// import { useRouter } from 'next/navigation';
// import { useToast } from '@/components/ui/use-toast';
// import { IBulkTerminalUploadProps, ISelectOption, ITableColumn } from '@/types';
// import { customStyles } from '@/styles';
// import { Button } from '@/components/ui/button';
// import Loader from '@/components/globals/Loader';
// import * as XLSX from 'xlsx';
// import Image from 'next/image';
// import EXCEL_LOGO from '../../../public/excel.svg';
// import { X, XCircle } from 'lucide-react';
// import { bulkUploadTerminal } from '../prisma/queries/terminalQueries';
// import { Progress } from '@/components/ui/progress';

// interface IUploadedData extends IBulkTerminalUploadProps {
//   status?: string;
//   error?: string | null;
// }
// const breadcrumbItems = [
//   { title: 'Terminal', link: PROTECTED_ROUTES.TERMINAL },
//   { title: 'Uploads', link: `${PROTECTED_ROUTES.TERMINAL}/bulk-uploads` },
// ];
// const FileUpload = ({ session }: { session: Session | null }) => {
//   const router = useRouter();
//   const { toast } = useToast();
//   const [excelFile, setExcelFile] = useState<File>();
//   const [jsonData, setJsonData] = useState<IBulkTerminalUploadProps[]>([]);
//   const [error, setError] = useState<string>('');
//   const [progress, setProgress] = useState<number>(0);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [clients, setClients] = useState<ISelectOption[]>([]);
//   const [selectedClient, setSelectedClient] = useState<ISelectOption>({ label: '', value: '' });
//   const [tableData, setTableData] = useState<IUploadedData[]>([]);

//   useEffect(() => {
//     const handleBeforeUnload = (event: BeforeUnloadEvent) => {
//       if (isLoading) {
//         // Cancel the event to prevent the browser from reloading
//         event.preventDefault();
//         // Chrome requires returnValue to be set
//         const msg = 'Are you sure want to leave this page?';
//         event.returnValue = msg;
//         return msg;
//       }
//     };

//     // Add event listener when component mounts
//     window.addEventListener('beforeunload', handleBeforeUnload);

//     // Remove event listener when component unmounts
//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, [isLoading]);

//   useEffect(() => {
//     const getClients = async () => {
//       if (session?.user.role !== PROTECTED_ROUTES.CLIENT) {
//         const { data, error } = await getAllClients();
//         if (error) {
//           toast({ variant: 'destructive', title: error });
//           router.replace(PROTECTED_ROUTES.MERCHANT);
//           return;
//         }
//         setClients((data || [])?.map((val) => ({ label: val?.name || '', value: val?.id || '' })));
//       }
//     };
//     getClients();
//   }, [router, session?.user.role, toast]);

//   const onDrop = useCallback((files: File[]) => {
//     setExcelFile(files[0]);
//     setTableData([]);
//     const file = files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const data = event.target?.result;
//       const workBook = XLSX.read(data, { type: 'binary' });
//       const worksheetName = workBook.SheetNames[0];
//       const worksheet = workBook.Sheets[worksheetName];
//       const fileData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//       const headers = fileData[0] as string[];
//       if (!checkHeaders(headers)) {
//         setError(`Invalid Format Header must includes ${EXCEL_FORMAT_HEADER.join(', ')}`);
//         return;
//       }
//       const jsonData = fileData.slice(1).map((row: any) => {
//         const obj: any = {};
//         headers.forEach((header: string, index: number) => {
//           console.log(`${row[index]}`);
//           obj[header] = row[index] ? `${row[index]}` : row[index];
//         });
//         return obj;
//       });
//       setJsonData(jsonData);
//     };
//     reader.readAsArrayBuffer(file);
//   }, []);

//   const handleUpload = async () => {
//     if (jsonData.length === 0 || !session) return;
//     let clientId = session?.user.id;
//     if (session.user.role === ROLES.ADMIN || session.user.role === ROLES.SUPER_ADMIN) {
//       if (!selectedClient.value) {
//         setError('missing clientId');
//         return;
//       }
//       clientId = selectedClient.value as string;
//     }

//     if (
//       session.user.role !== ROLES.CLIENT &&
//       session.user.role !== ROLES.ADMIN &&
//       session.user.role !== ROLES.SUPER_ADMIN
//     ) {
//       const { error, data } = await getUserById(session.user.id);
//       if (error || !data?.clientId) {
//         setError('missing clientId');
//         return;
//       }
//       clientId = data?.clientId;
//     }
//     setIsLoading(true);
//     router.push(`${PROTECTED_ROUTES.TERMINAL}/bulk-uploads?loading=true`);
//     await sleep(1000);
//     let count = 0;
//     for await (const terminalData of jsonData) {
//       count++;
//       const { data, error, status } = await bulkUploadTerminal(terminalData, clientId, session);
//       if (status === 'server error') {
//         break;
//       }
//       if (status === 'rejected') {
//         setTableData((prev) => [...prev, { ...data.rejectedData, status, error }]);
//       }
//       if (status === 'accepted') {
//         setTableData((prev) => [...prev, { ...data.acceptedData, status, error }]);
//       }
//       setProgress(Math.round((count / jsonData.length) * 100));
//     }
//     await sleep(200);
//     router.push(`${PROTECTED_ROUTES.TERMINAL}/bulk-uploads`);
//     setIsLoading(false);
//   };

//   const { isDragActive, getRootProps, getInputProps, isDragReject } = useDropzone({
//     onDrop,
//     minSize: 0,
//     maxFiles: 1,
//     maxSize: 100048576, // Byte => 100 MB
//     accept: {
//       'text/csv': [],
//       'text/x-csv': [],
//       'application/csv': [],
//       ' application/x-csv': [],
//       'application/vnd.ms-excel': [],
//       'text/comma-separated-values': [],
//       'text/x-comma-separated-values': [],
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
//     },
//   });

//   const ITableColumn: ITableColumn<IUploadedData>[] = [
//     {
//       key: 'Brand',
//       label: 'Brand',
//     },
//     {
//       key: 'Model',
//       label: 'Model',
//     },
//     {
//       key: 'TID',
//       label: 'TID',
//     },
//     {
//       key: 'Serial No',
//       label: 'Serial No',
//     },
//     {
//       key: 'MID',
//       label: 'MID',
//     },
//     {
//       key: 'Name',
//       label: 'Name',
//     },
//     {
//       key: 'Phone',
//       label: 'Phone',
//     },
//     {
//       key: 'Email',
//       label: 'Email',
//     },
//     {
//       key: 'Address',
//       label: 'Address',
//     },
//     {
//       key: 'Company Name',
//       label: 'Company Name',
//     },
//     {
//       key: 'Contact Person Email',
//       label: 'Contact Person Email',
//     },
//     {
//       key: 'Contact Person Phone',
//       label: 'Contact Person Phone',
//     },

//     {
//       key: 'status',
//       label: 'Status',
//       render: (_, value) => {
//         return (
//           <span
//             className={cn('font-semibold', {
//               'text-green-500': value.status === 'accepted',
//               'text-red-500': value.status !== 'accepted',
//             })}>
//             {value.status === 'accepted' ? 'ACCEPTED' : 'REJECTED'}
//           </span>
//         );
//       },
//     },
//     {
//       key: 'error',
//       label: 'Reason',
//       render: (_, value) => {
//         return (
//           <span
//             className={cn('font-semibold', {
//               'text-green-500': value.status === 'accepted',
//               'text-red-500': value.status !== 'accepted',
//             })}>
//             {value.error}
//           </span>
//         );
//       },
//     },
//   ];

//   const handleRemoveFile = () => {
//     if (!isLoading) {
//       setError('');
//       setExcelFile(undefined);
//       setProgress(0);
//       setJsonData([]);
//       setTableData([]);
//     }
//   };

//   return (
//     <div className="px-10">
//       <Breadcrumb items={breadcrumbItems} loading={isLoading} />
//       <div className="flex items-center justify-between pb-4">
//         <Heading title="Upload terminal" description="Upload multiple terminal data at one place" />
//       </div>

//       {(session?.user.role === ROLES.SUPER_ADMIN || session?.user.role === ROLES.ADMIN) && (
//         <div className="pb-8">
//           <Separator />
//           <div
//             className="
//         text-foreground/60 text-2xl py-2">
//             Select Client
//           </div>
//           <Select
//             isDisabled={isLoading}
//             options={clients}
//             placeholder="Select Client*"
//             value={selectedClient.value ? selectedClient : null}
//             onChange={(val) => {
//               handleRemoveFile();
//               setSelectedClient(val);
//             }}
//             styles={customStyles}
//           />
//         </div>
//       )}

//       {(session?.user.role === ROLES.SUPER_ADMIN || session?.user.role === ROLES.ADMIN) &&
//       !selectedClient.value ? null : (
//         <div>
//           <Separator />
//           <div
//             className="
//         text-foreground/60 text-2xl py-2">
//             Upload excel
//           </div>

//           <div>
//             {excelFile ? (
//               <div className="dropzone flex items-center justify-center w-full">
//                 <div
//                   className={cn(
//                     'flex flex-col items-center justify-center w-full  border-2  border-dashed rounded-lg cursor-pointer',
//                     {
//                       'dark:bg-zinc-700 border-primary/60 dark:border-primary/60 dark:hover:bg-zinc-600 dark:hover:border-primary':
//                         !excelFile,
//                       'dark:bg-primary-foreground bg-primary-foreground border-primary dark:border-primary':
//                         excelFile,
//                       'border-red-600 dark:border-red-600  dark:hover:border-red-600': error,
//                     },
//                   )}>
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6 group">
//                     <div className="relative w-[100px] h-[100px] rounded-md overflow-hidden ">
//                       <div className="z-10 absolute top-0 right-0 invisible group-hover:visible">
//                         <Button
//                           type="button"
//                           disabled={isLoading}
//                           className=""
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleRemoveFile();
//                           }}
//                           variant="destructive"
//                           size="sm">
//                           <XCircle className="h-4 w-4" />
//                         </Button>
//                       </div>
//                       <div>
//                         <Image src={EXCEL_LOGO} alt="excel-logo" />
//                       </div>
//                     </div>
//                     <div
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleRemoveFile();
//                       }}
//                       className="flex items-center gap-2">
//                       <p className="text-sm">{excelFile.name}</p>
//                       <X className="h-4 w-4 hover:bg-red-600 rounded-full " />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div
//                 {...getRootProps({ className: 'dropzone flex items-center justify-center w-full' })}
//                 onClick={(e) => e.stopPropagation()}>
//                 <label
//                   className={cn(
//                     'flex flex-col items-center justify-center w-full  border-2  border-dashed rounded-lg cursor-pointer',
//                     {
//                       'dark:bg-zinc-700 border-primary/60 dark:border-primary/60 dark:hover:bg-zinc-600 dark:hover:border-primary':
//                         !isDragActive,
//                       'dark:bg-primary-foreground bg-primary-foreground border-primary dark:border-primary':
//                         isDragActive,
//                       'dark:bg-red-800 border-red-600 dark:border-red-600 dark:hover:border-red-600':
//                         isDragReject,
//                     },
//                   )}>
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <svg
//                       className="w-10 h-10 mb-3 text-primary"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
//                     </svg>
//                     <p className="text-x  ">Upload .xlsx, .xls or .csv file</p>
//                     {isDragActive ? (
//                       <p className="mb-2 text-x font-semibold text-secondary-foreground">
//                         {isDragReject ? 'This file is not accepted' : 'Drop file(s) here ...'}
//                       </p>
//                     ) : (
//                       <p className="mb-2 text-x font-semibold text-primary">
//                         <span className="font-semibold">Click to upload</span> or drag and drop
//                       </p>
//                     )}
//                   </div>
//                   <input id="dropzone-file" type="file" {...getInputProps()} />
//                 </label>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//       {isLoading && (
//         <div className="flex items-center mt-2">
//           <span className="text-right mr-2">{progress}%</span>
//           <div className="w-full">
//             <Progress value={progress} className="h-2" />
//           </div>
//         </div>
//       )}
//       {error && <div className="text-red-600 text-x p-2">{error}</div>}
//       <Button
//         disabled={isLoading || !!error || jsonData.length === 0 || !excelFile}
//         className="ml-auto mt-5"
//         onClick={handleUpload}>
//         {!isLoading ? 'Upload' : <Loader />}
//       </Button>
//       {tableData.length > 0 && !isLoading && (
//         <div className="pb-10">
//           <Table data={tableData as any} columns={ITableColumn} isPagination />
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;
