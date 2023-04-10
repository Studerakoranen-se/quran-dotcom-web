const LessonsSidebar = () => {
  const lessons = [
    { title: "Introduction to the Quran", duration: "30 mins" },
    {
      title: "The Importance of Understanding Arabic",
      duration: "45 mins",
    },
    {
      title: "Basic Arabic Grammar for Quranic Study",
      duration: "60 mins",
    },
    { title: "Surah Al-Fatiha: The Opening Chapter", duration: "90 mins" },
    { title: "Surah Al-Baqarah: The Cow", duration: "120 mins" },
    { title: "Tafsir of Surah Yasin", duration: "90 mins" },
    { title: "The Miraculous Nature of the Quran", duration: "60 mins" },
  ];

  return (
    <div className="text-white text-sm w-full space-y-5">
      {lessons.map((lesson: any, i: number) => (
        <div key={i} className="flex justify-between w-full">
          <div className="">{lesson.title}</div>
          <div className="">{lesson.duration}</div>
        </div>
      ))}
    </div>
  );
};

export default LessonsSidebar;
