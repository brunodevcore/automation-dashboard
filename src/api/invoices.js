import api from './axios'

export const getInvoicesRequest = async () => {
  const response = await api.get('/invoices')
  return response.data
}

export const createInvoiceRequest = async (invoiceData) => {
  const response = await api.post('/invoices', invoiceData)
  return response.data
}

export const payInvoiceRequest = async (invoiceId) => {
  const response = await api.put(`/invoices/${invoiceId}/pay`)
  return response.data
}