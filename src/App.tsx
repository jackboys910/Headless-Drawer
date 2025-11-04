import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Drawer } from './layout/Drawer'
import { ErrorBoundary } from './components/ErrorBoundary'

// страница заглушка, чтобы увидеть изменение роута страницы
const Page = ({ title }: { title: string }) => <h1 className="text-3xl font-semibold">{title}</h1>

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route element={<Drawer />}>
            <Route index element={<Page title="Home" />} />
            <Route path="cats" element={<Page title="Cats" />} />
            <Route path="jobs" element={<Page title="Jobs" />} />
            <Route path="veg" element={<Page title="Veggies" />} />
            <Route path="bike" element={<Page title="Bikes" />} />
            <Route path="prices" element={<Page title="Prices" />} />

            <Route path="reports">
              <Route index element={<Page title="Reports" />} />
              <Route path="w" element={<Page title="Weekly reports" />} />
              <Route path="m" element={<Page title="Monthly reports" />} />
            </Route>
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
