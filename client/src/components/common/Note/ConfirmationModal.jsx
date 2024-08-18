
export default function ConfirmationModal({ modalData }) {
    return (
      <div className="fixed inset-0 z-[100] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="w-[90vw]  rounded-lg border border-slate-400 bg-slate-600 p-6">
          <p className="text-2xl font-semibold text-slate-50">
            {modalData?.text1}
          </p>
          <p className="mt-3 mb-5 leading-6 text-slate-200">
            {modalData?.text2}
          </p>
          <div className="flex items-center gap-x-4">
            <button
              onClick={modalData?.btn1Handler}
              className="cursor-pointer rounded-md bg-blue-200 py-[8px] px-[20px] font-semibold text-slate-900"
            >
              {modalData?.btn1Text}
            </button>
            <button
              className="cursor-pointer rounded-md  text-white py-[8px] px-[20px] font-semibold  "
              onClick={modalData?.btn2Handler}
            >
              {modalData?.btn2Text}
            </button>
          </div>
        </div>
      </div>
    )
  }