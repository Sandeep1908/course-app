import React from "react";

function CourseCard({
    title,
    description,
    imgUrl,
    redirectTo,
    instructor,
    ...props
}) {
  return (
    <div className="p-5 max-w-[300px] h-auto">
      <div className="bg-white rounded-lg shadow-lg">
        <img
          src={imgUrl}
          alt=""
          className="rounded-t-lg w-full"
           
        />
        <div className="p-6">
          <h2 className="font-bold mb-2 text-xl text-blue-800">
            {title}
          </h2>
            <p className="mb-2 text-slate-700">Instructor: {instructor}</p>
          <p className="  mb-2 text-sm">
            {description}
          </p>
          <a
            href={redirectTo}
            className="bg-blue-600 p-2   text-white   hover:text-white-500  text-sm"
          >
            View Detail
          </a>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
