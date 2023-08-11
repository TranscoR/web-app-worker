import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomTabPanel from './CustomTabPanel';
import SchoolCycle from './tabs/SchoolCycle';
import Expenses from './tabs/Expenses';
import Chargers from './tabs/Charges';

const Index = () => {
  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const [value, setValue] = useState<boolean | any>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Ciclo escolar" {...a11yProps(0)} />
          <Tab label="Gastos" {...a11yProps(1)} />
          <Tab label="Cobros" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <SchoolCycle />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Expenses />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Chargers />
      </CustomTabPanel>
    </Box>
  );
};

export default Index;
