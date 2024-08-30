import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'

const API_KEY = process.env.NEXT_PUBLIC_ROOM_API_KEY;

export async function POST(request: NextRequest){
  
  const token = request.headers.get('authorization');
  
  if (!token || token !== API_KEY) {
    return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await request.json();
    const { roomIDs } = response;
    console.log('Recibido array de roomIDs:', roomIDs);
    const res = NextResponse.json({ status: 'success', received: roomIDs });
    return res;
  } 
  catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ status: 'error', message: error.message }, { status: 400 });
      } else {
        return NextResponse.json({ status: 'error', message: `Unknown error occurred: ${error}` }, { status: 400 });
      }
    }
  }











