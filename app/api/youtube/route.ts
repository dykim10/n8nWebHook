return new Response(JSON.stringify({
  success: true,
  message: "성공적으로 처리되었습니다",
  returnData: {
    resultText: webhookData[0].response.output_text
  }
}), {
  headers: { 'Content-Type': 'application/json' },
}); 