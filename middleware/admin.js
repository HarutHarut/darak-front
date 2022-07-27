export default function ({$auth, redirect}) {
    if ($auth.user.role.name !== 'admin') {
        return redirect('/')
    }
}
