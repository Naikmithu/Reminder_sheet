function createRevisionReminders() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const calendar = CalendarApp.getDefaultCalendar();

  for (let i = 1; i < data.length; i++) {
    let [date, topic, category] = data[i];
    Logger.log(`Row ${i + 1} - Raw Date: ${date}, Topic: ${topic}, Category: ${category}`);

    if (!topic || !date) {
      Logger.log(`Skipped row ${i + 1} due to missing topic or date`);
      continue;
    }

    if (typeof date === 'string') {
      const match = date.match(/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/);
      if (match) {
        const [_, day, month, year] = match;
        date = new Date(`${year}-${month}-${day}`);
        Logger.log(`Parsed date to: ${date}`);
      } else {
        Logger.log(`Invalid date format in row ${i + 1}: ${date}`);
        continue;
      }
    }

    if (!(date instanceof Date) || isNaN(date)) {
      Logger.log(`Invalid Date object after parsing at row ${i + 1}`);
      continue;
    }

    const days = [3, 7, 15];
    days.forEach(offset => {
      const reminderDate = new Date(date);
      reminderDate.setDate(reminderDate.getDate() + offset);

      // Set event from 9:00 PM to 9:30 PM
      const startTime = new Date(reminderDate);
      startTime.setHours(21, 0, 0);  // 21:00 = 9 PM
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + 30);

      const title = `Revise: ${topic} [${category}] (Day ${offset})`;
      Logger.log(`Checking: ${title} for ${startTime.toLocaleString()}`);

      const events = calendar.getEvents(startTime, endTime);
      const alreadyExists = events.some(e => e.getTitle() === title);

      if (!alreadyExists) {
        calendar.createEvent(title, startTime, endTime);
        Logger.log(` Created: ${title} from ${startTime.toLocaleString()} to ${endTime.toLocaleString()}`);
      } else {
        Logger.log(`Skipped duplicate: ${title}`);
      }
    });
  }

  SpreadsheetApp.getUi().alert(" Script finished! Check Logs (View > Logs) for details.");
}
