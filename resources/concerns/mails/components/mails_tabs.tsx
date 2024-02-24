import React from 'react'
import useParams from '@/hooks/use_params'
import Tab from '@/components/tab'

interface MailsTabsProps {}

const MailsTabs: React.FunctionComponent<MailsTabsProps> = () => {
  const params = useParams()
  const tabHrefPrefix = `/organizations/${params.organizationSlug}/projects/${params.projectSlug}`
  const mailTabs = [
    {
      label: 'Overview',
      href: tabHrefPrefix + '/mails',
    },
    {
      label: 'Domains',
      href: `${tabHrefPrefix}/mail_domains`,
    },
    {
      label: 'API keys',
      href: `${tabHrefPrefix}/mail_api_keys`,
    },
  ]

  return (
    <nav className="flex overflow-x-auto border-b border-zinc-200 bg-white py-4 px-12">
      <ul className="flex min-w-full flex-none gap-x-6 text-sm font-semibold leading-6 text-zinc-600">
        {mailTabs.map((item) => (
          <Tab key={item.label} {...item} />
        ))}
      </ul>
    </nav>
  )
}

export default MailsTabs
