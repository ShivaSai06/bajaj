export async function GET(request) {
  return new Response(JSON.stringify({ "operation_code": 1 }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  const body = await request.json();
  const { data } = body;

  if (!data || !Array.isArray(data)) {
    return new Response(JSON.stringify({
      "is_success": false,
      "message": "Invalid input data format"
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const userId = "shiva12345"; // Replace with your actual user ID logic
  const email = "shivasaikuntla@gmail.com"; // Replace with your actual email
  const rollNumber = "21BCT0422"; // Replace with your actual roll number

  let numbers = [];
  let alphabets = [];
  let highestLowercaseAlphabet = null;

  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (typeof item === 'string') {
      alphabets.push(item);
      if (item === item.toLowerCase() && (!highestLowercaseAlphabet || item > highestLowercaseAlphabet)) {
        highestLowercaseAlphabet = item;
      }
    }
  });

  return new Response(JSON.stringify({
    "is_success": true,
    "user_id": userId,
    "email": email,
    "roll_number": rollNumber,
    "numbers": numbers,
    "alphabets": alphabets,
    "highest_lowercase_alphabet": highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}