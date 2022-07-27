export default function ({$auth, redirect})  {
    if ($auth.user.role.name !== 'business_owner') {
        return redirect('/')
    }
}
