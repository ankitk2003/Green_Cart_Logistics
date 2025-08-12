import React from "react";
import { loadingAtom } from "../../store/loadingAtom";
import { useRecoilValue } from "recoil";

const Loader = () => {
  const loading = useRecoilValue(loadingAtom);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
