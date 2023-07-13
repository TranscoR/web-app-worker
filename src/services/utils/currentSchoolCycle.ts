export const currentSchoolCycle = () => {
  const date = new Date();
  const current_year = date.getFullYear();
  const new_year = date.getFullYear() + 1;

  return `${current_year} - ${new_year}`;
};
