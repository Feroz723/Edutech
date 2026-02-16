import React from 'react';

export default function Students() {
  const studentsList = [
    {
      name: 'Marcus Holloway',
      email: 'marcus@example.com',
      courses: 5,
      completion: 98,
      grade: 'A+',
      gradeColor: 'text-emerald-600',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrI5SCknSSDtHglOCS9YqlTtMNmpvYn59fN1ecz2LPxDQwCvgwuKhXBiNA1vs8dUuAnZ0yX037AKJhMbMhtn8KOnx7b3luN4oszxNZK_n4li6OFhkNckqhH36DdckIO69NOE5ANHkNeQ3bl91De8llKD3CVuNcIuTCE6J3Hqn88BXbEbxqIQ5NLJvFxufitANKZwRTa_44D2rixgwC3O0eFmzQqdJwJQYy9iGNYURcopGj6PpafzRca7ztdCgNHUw-_8eGg2eLEoep',
    },
    {
      name: 'Sofia Rodriguez',
      email: 'sofia.r@example.com',
      courses: 3,
      completion: 92,
      grade: 'A',
      gradeColor: 'text-emerald-600',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7PRrSQE5dGEGlvQpdEgelUo1jnt2Y4qLAhM0FlxWm_KE00MVUwhRbvr1_NuOXnWZo4cAOEa6o0sH5_nfftFIuwN3eZYIGXxoVy4x5QzztdTNTMONX5OkWiXHI1gVq2AK0Wjpb1sAgRvDoua-BArHTWvAEgSrqRXevHiNkpv9bOFPCPa1GL2IAvX5EzU1KhzTj63bgvfLQL0CV9ffTp97jvlV9aczmHsGMUxFNSnis_LQhevrEUwcPLkgo7rbAWflc0CogC8n6xf7v',
    },
    {
      name: 'Liam Henderson',
      email: 'liam.h@example.com',
      courses: 8,
      completion: 85,
      grade: 'A-',
      gradeColor: 'text-emerald-600',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCP-96h8U4ur_HxhHw-nKrLEn9zTTSJjNJhJ0bvsveNdESrN-0N-3NdNFEcOJvYkFqTCb4aXkDQz4QO6gesL646h70UF47THwk9pmpsmn4h80V51SkejenQuvIyMtyk7anMcSI3PvowdJtMe1kKKqUqJHbpv2masj2GtNCVU31hwVBG3fFYKgWuu-0UzqNfh_OJVPYrPV4VexUzmFypmTgdh92f0mpmfKoqltRUzqlcaT7Qhdju0K-zPdXgirk7DT3IXmIalWOfizK4',
    },
    {
      name: 'Emma Thompson',
      email: 'emma.t@example.com',
      courses: 4,
      completion: 78,
      grade: 'B+',
      gradeColor: 'text-blue-600',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8WIh4gT0RytNB1DHffofJFUWRzFi46iwpmbrutgGRb3JS5Qo0XwZ13btVWpcOPpqMWSRGR0BCh3gJdiH098jUnlsw933WsFOtEORSha_arx0TVNKR__QG8t3XWlzElLUxYnQzSaZnvIm7xbIaUkDirMa2JMzK9b3TtCM7XPnr1hTHl4KLRhNefnYTNh5abuSvDx63mLTkxUDlZmenTaYl3211rf3c95qFePImLD_Isn_X2wEff4T6kehhFgB5DcQxuxTYbDA6oO1Z',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Student Management</h1>
          <p className="text-slate-500">Track student progress and performance across all courses.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">download</span> Export List
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-blue-700 transition-colors">
            <span className="material-symbols-outlined">person_add</span> Add Student
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Top Performing Students</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Active Courses</th>
                <th className="px-6 py-4">Completion Rate</th>
                <th className="px-6 py-4">Avg. Grade</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {studentsList.map((student, index) => (
                <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                        <img alt="Avatar" className="w-full h-full object-cover" src={student.image} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{student.courses}</td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 max-w-[120px]">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${student.completion}%` }}></div>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 mt-1 block">{student.completion}%</span>
                  </td>
                  <td className={`px-6 py-4 font-bold ${student.gradeColor}`}>{student.grade}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 uppercase">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
