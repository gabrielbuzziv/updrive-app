export default {
    company: parseInt(localStorage.getItem('updrive.company')) || '',
    pendings: [],
    pendings_amount: 0,
    documents: [],
    documents_amount: 0,
    documents_total: 0,
    documents_query: localStorage.getItem('updrive.documents.query') || '',
    documents_status: parseInt(localStorage.getItem('updrive.documents.status')) || '',
    page: 1,
    records: 0,

    // Tracking States
    tracking: [],
    tracking_page: 1,
    tracking_records: 0
}