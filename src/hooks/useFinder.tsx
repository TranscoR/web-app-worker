export const useFinder = (value: string | null, data: any[]) => {
  return value != null && value.length > 0
    ? data.filter(
        (item) =>
          item.student_name
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          item.school_name
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          item.list_number.includes(value)
      )
    : data;
};
