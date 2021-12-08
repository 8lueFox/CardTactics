namespace CardTactics.Extensions
{
    public static class StringExtensions
    {
        public static string NameOf(this object o)
        {
            return o.GetType().Name;
        }
    }
}