import ProfilePage from "../ProfilePage";

export default function ProfilePageExample() {
  return (
    <div className="h-[600px]">
      <ProfilePage
        mediaCount={{
          shows: 12,
          movies: 24,
          books: 8,
        }}
        onLogout={() => {
          // example-only: no real logout needed
          console.log("Logout clicked (example)");
        }}
      />
    </div>
  );
}
