import React from 'react';

export default function Courses() {
  const coursesList = [
    {
      name: 'Advanced React Design Patterns',
      chapters: 12,
      hours: 8.5,
      category: 'Development',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcproyESwAtBxJeCkdywZp38Oo9rkqeX5apcg0j8xOO838c35xrqnMuFGblAb1Nua4ZuLp5jn06CS8FHbo4r9pu8o3fNBWGTQNIIwezziecK2M6ZrZDAz6qlPCyA1yUhIvNT0SRJsBXKGPGHUHZkB7XcT34CMg3_IMKeyAE8mkoOdWgbNlgJyPPX07zivyL-QiBdXIUYi1-Xr-2AvqsNkM6Ybybrz7Uou_u3E2H1E4ZTuFsqfq3_IbnpFMS7S9mBrqjSf5ol2w8Opo',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">All Courses</h1>
          <p className="text-slate-500">Manage and organize your learning material.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coursesList.map((course, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm"
          >
            <img alt="Course" className="w-full h-40 object-cover" src={course.image} />
            <div className="p-5">
              <h4 className="font-bold text-slate-900 dark:text-white truncate">{course.name}</h4>
              <p className="text-sm text-slate-500 mt-1">
                {course.chapters} Chapters • {course.hours} Hours
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-primary bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                  {course.category}
                </span>
                <button className="text-primary font-semibold text-sm hover:underline">Edit Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
