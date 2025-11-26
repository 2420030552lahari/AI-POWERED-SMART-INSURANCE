import jsPDF from 'jspdf'

export interface InvoiceData {
  policyNumber: string
  policyType: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  planName: string
  premium: number
  gst: number
  discount?: number
  issueDate: string
  validFrom: string
  validTo: string
  idv?: string
  addons?: string[]
}

export function generatePDFInvoice(data: InvoiceData): void {
  const doc = new jsPDF()

  // Calculate amounts
  const subtotal = data.premium
  const discountAmount = data.discount || 0
  const afterDiscount = subtotal - discountAmount
  const gstAmount = (afterDiscount * data.gst) / 100
  const total = afterDiscount + gstAmount

  // Colors
  const primaryColor = '#3b82f6'
  const darkColor = '#1e293b'
  const grayColor = '#64748b'

  let yPos = 20

  // Header - Company Logo and Title
  doc.setFillColor(59, 130, 246)
  doc.rect(0, 0, 210, 40, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('🛡️ Smart Insurance', 20, 20)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('AI-Powered Insurance for India', 20, 28)
  doc.text('IRDAI Reg: IRDAI/HO/2024/12345 | GST: 27AABCU9603R1ZM', 20, 34)

  // Invoice Title
  doc.setFontSize(28)
  doc.setFont('helvetica', 'bold')
  doc.text('INVOICE', 150, 20)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text(`Invoice No: INV-${data.policyNumber}`, 150, 28)
  doc.text(`Date: ${new Date(data.issueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`, 150, 34)

  yPos = 50

  // Bill To Section
  doc.setTextColor(30, 41, 59)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('BILL TO', 20, yPos)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(71, 85, 105)
  yPos += 7
  doc.text(data.customerName, 20, yPos)
  yPos += 5
  doc.text(data.customerEmail, 20, yPos)
  yPos += 5
  doc.text(data.customerPhone, 20, yPos)
  yPos += 5
  const addressLines = doc.splitTextToSize(data.customerAddress, 70)
  doc.text(addressLines, 20, yPos)

  // Policy Information Section
  yPos = 50
  doc.setTextColor(30, 41, 59)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('POLICY INFORMATION', 120, yPos)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(71, 85, 105)
  yPos += 7
  doc.text(`Policy Number: ${data.policyNumber}`, 120, yPos)
  yPos += 5
  doc.text(`Policy Type: ${data.policyType}`, 120, yPos)
  yPos += 5
  doc.text(`Plan: ${data.planName}`, 120, yPos)
  yPos += 5
  doc.text(`Valid: ${new Date(data.validFrom).toLocaleDateString('en-IN')}`, 120, yPos)
  yPos += 5
  doc.text(`to ${new Date(data.validTo).toLocaleDateString('en-IN')}`, 120, yPos)

  yPos = 95

  // Coverage Details Box (if applicable)
  if (data.idv || (data.addons && data.addons.length > 0)) {
    doc.setFillColor(248, 250, 252)
    doc.rect(20, yPos, 170, data.addons && data.addons.length > 0 ? 35 : 20, 'F')

    doc.setTextColor(30, 41, 59)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('COVERAGE DETAILS', 25, yPos + 7)

    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(71, 85, 105)

    if (data.idv) {
      doc.text(`IDV: ${data.idv}`, 25, yPos + 14)
      doc.text('Coverage: 1 Year', 100, yPos + 14)
    }

    if (data.addons && data.addons.length > 0) {
      doc.setFont('helvetica', 'bold')
      doc.text('Add-ons Included:', 25, yPos + 21)
      doc.setFont('helvetica', 'normal')
      let addonY = yPos + 26
      data.addons.forEach((addon, index) => {
        if (index < 3) {
          doc.text(`✓ ${addon}`, 25, addonY)
          addonY += 4
        }
      })
    }

    yPos += data.addons && data.addons.length > 0 ? 40 : 25
  }

  // Table Header
  doc.setFillColor(241, 245, 249)
  doc.rect(20, yPos, 170, 10, 'F')

  doc.setTextColor(30, 41, 59)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text('DESCRIPTION', 25, yPos + 7)
  doc.text('PERIOD', 120, yPos + 7)
  doc.text('AMOUNT', 165, yPos + 7)

  // Table Row
  yPos += 15
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(71, 85, 105)
  doc.text(`${data.policyType}`, 25, yPos)
  doc.setFontSize(8)
  doc.setTextColor(100, 116, 139)
  doc.text(`${data.planName} Plan`, 25, yPos + 4)

  doc.setFontSize(9)
  doc.setTextColor(71, 85, 105)
  doc.text('1 Year', 120, yPos)
  doc.text(`₹${subtotal.toLocaleString('en-IN')}`, 165, yPos)

  // Separator line
  yPos += 10
  doc.setDrawColor(226, 232, 240)
  doc.line(20, yPos, 190, yPos)

  // Summary Box
  yPos += 10
  const summaryX = 120
  doc.setFillColor(248, 250, 252)
  doc.rect(summaryX, yPos, 70, discountAmount > 0 ? 45 : 35, 'F')

  doc.setFontSize(9)
  doc.setTextColor(100, 116, 139)
  doc.setFont('helvetica', 'normal')

  let summaryY = yPos + 8
  doc.text('Subtotal:', summaryX + 5, summaryY)
  doc.text(`₹${subtotal.toLocaleString('en-IN')}`, summaryX + 60, summaryY, { align: 'right' })

  if (discountAmount > 0) {
    summaryY += 7
    doc.text('Discount:', summaryX + 5, summaryY)
    doc.setTextColor(22, 163, 74)
    doc.text(`- ₹${discountAmount.toLocaleString('en-IN')}`, summaryX + 60, summaryY, { align: 'right' })

    summaryY += 7
    doc.setTextColor(100, 116, 139)
    doc.text('After Discount:', summaryX + 5, summaryY)
    doc.text(`₹${afterDiscount.toLocaleString('en-IN')}`, summaryX + 60, summaryY, { align: 'right' })
  }

  summaryY += 7
  doc.text(`GST (${data.gst}%):`, summaryX + 5, summaryY)
  doc.text(`₹${gstAmount.toLocaleString('en-IN')}`, summaryX + 60, summaryY, { align: 'right' })

  // Total
  summaryY += 10
  doc.setDrawColor(59, 130, 246)
  doc.setLineWidth(0.5)
  doc.line(summaryX + 5, summaryY - 3, summaryX + 65, summaryY - 3)

  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(59, 130, 246)
  doc.text('Total Amount:', summaryX + 5, summaryY)
  doc.text(`₹${total.toLocaleString('en-IN')}`, summaryX + 60, summaryY, { align: 'right' })

  // Payment Status Badge
  yPos = summaryY + 15
  doc.setFillColor(220, 252, 231)
  doc.roundedRect(80, yPos, 30, 8, 2, 2, 'F')
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(22, 101, 52)
  doc.text('PAID', 95, yPos + 5.5, { align: 'center' })

  // Footer
  yPos = 260
  doc.setDrawColor(226, 232, 240)
  doc.setLineWidth(0.3)
  doc.line(20, yPos, 190, yPos)

  yPos += 8
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 116, 139)
  doc.text('Thank you for choosing Smart Insurance. Your policy is now active.', 105, yPos, { align: 'center' })

  yPos += 6
  doc.setFontSize(8)
  doc.text('For queries: support@smartinsurance.in | Call: 1800-123-4567', 105, yPos, { align: 'center' })

  yPos += 5
  doc.setTextColor(148, 163, 184)
  doc.text('This is a computer-generated invoice and does not require a signature.', 105, yPos, { align: 'center' })

  // Save the PDF
  doc.save(`Invoice_${data.policyNumber}_${new Date().getTime()}.pdf`)
}

// Keep the HTML version as backup
export function downloadInvoice(data: InvoiceData): void {
  generatePDFInvoice(data)
}
