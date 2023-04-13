import { ImFilePlay } from "react-icons/im";
import { ImFileText2 } from "react-icons/im";
import { FaFilePdf } from "react-icons/fa";

const ResourcesTab = (props: any) => {
  const { lesson, lessonCount } = props;
  const files = ["file1", "file2", "file3"];
  return (
    <div className="font-light">
      <h1 className="font-medium">Course Summary</h1>
      <div
        className="space-y-3 py-3"
        dangerouslySetInnerHTML={{
          __html: lesson?.description,
        }}
      ></div>
      {/* Resource count  */}
      <div className="flex gap-10 my-3">
        <div className="flex items-center gap-2">
          <ImFilePlay />
          <p>{lessonCount} lessons</p>
        </div>
        <div className="flex items-center gap-2">
          <ImFileText2 />
          <p>9 files</p>
        </div>
      </div>
      {/* Files */}
      <div className="mt-10">
        <h1 className="font-medium mb-5">Download Resources</h1>
        <div className="space-y-3">
          {files.map((file: any, i: number) => (
            <button
              key={i}
              className="bg-[#365F5F] hover:bg-[#427474] transition-all px-5 py-2 rounded flex justify-between items-center w-full"
            >
              <div className="">{i + 1 + ". " + file}</div>
              <div className="">
                <FaFilePdf className="fill-red-300" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesTab;
