function* xrange( count: number, start: number = 0 )
{
  for( let i = 0; i < count; i++ )
  {
    yield i + start;
  }
}

export function range( count: number, start: number = 0 )
{
  return Array.from( xrange( count, start ) );
}
