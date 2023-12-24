// import React from 'react';
// import { connect } from 'react-redux';
// import { Button } from 'react-bootstrap'; // Assuming you're using Bootstrap

// // Your Google Sheets API credentials
// const CLIENT_ID = 'YOUR_CLIENT_ID';
// const API_KEY = 'YOUR_API_KEY';
// const SHEET_ID = 'YOUR_SHEET_ID';

// // Function to load Google Sheets API
// const loadSheetsApi = () => {
//   return new Promise((resolve) => {
//     gapi.load('client', () => {
//       gapi.client.init({
//         apiKey: API_KEY,
//         clientId: CLIENT_ID,
//         discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
//         scope: 'https://www.googleapis.com/auth/spreadsheets',
//       }).then(() => {
//         resolve();
//       });
//     });
//   });
// };

// class ExportToGoogleSheets extends React.Component {
//   exportToSheets = async () => {
//     try {
//       await loadSheetsApi();

//       const { reduxState } = this.props; // Assuming you've mapped Redux state to props

//       // Example: Getting data from Redux state
//       const dataToExport = reduxState.data; // Modify this based on your Redux state structure

//       // Example: Writing data to Google Sheets
//       const response = await gapi.client.sheets.spreadsheets.values.update({
//         spreadsheetId: SHEET_ID,
//         range: 'Sheet1!A1', // Update the range where you want to export data
//         valueInputOption: 'RAW',
//         resource: {
//           values: dataToExport,
//         },
//       });

//       console.log('Data exported to Google Sheets:', response);
//       // Handle success or show a success message to the user
//     } catch (error) {
//       console.error('Error exporting data:', error);
//       // Handle error or show an error message to the user
//     }
//   };

//   render() {
//     return (
//       <div>
//         <Button onClick={this.exportToSheets}>Export to Google Sheets</Button>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     reduxState: state, // Replace 'state' with your actual Redux state
//   };
// };

// export default connect(mapStateToProps)(ExportToGoogleSheets);
