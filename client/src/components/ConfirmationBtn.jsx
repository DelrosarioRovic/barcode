export default function ConfirmationBtn({setNotif, setManyProducts, setSerialNumber, setIsScanSingle}) {
    const handleNotifOk = () => {
        setNotif(false)
        setManyProducts([]);
        setSerialNumber("");
        setIsScanSingle("Single");
    }

    const handleNotifCancel = () => {
        setNotif(false)
    }

  return (
    <div className="flex absolute inset-0 h-screen w-full justify-center items-center z-10 bg-black bg-opacity-40">
      <div className="flex flex-col justify-evenly items-center shadow-2xl bg-white z-20 h-60 w-[500px] rounded-lg">
        <h1 className="text-4xl font-bold">Do you want to continue?</h1>
        <div className="flex justify-center gap-5">
          <button onClick={handleNotifOk} className="font-semibold rounded-md py-3 px-5 text-white bg-blue-500">Ok</button>
          <button onClick={handleNotifCancel} className="font-semibold rounded-md py-3 px-2 text-white bg-red-500">Cancel</button>
        </div>
      </div>
    </div>
  );
}
