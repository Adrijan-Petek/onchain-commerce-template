import { GITHUB_LINK, ONCHAINKIT_LINK } from 'src/links';
import { ExternalLinkSvg } from 'src/svg/ExternalLinkSvg';

export default function OnchainStoreSummary() {
  return (
    <div className="flex flex-col justify-center border-gray-200 border-b bg-white/60 p-4 py-6 md:w-1/3 md:border-r md:border-b-0 md:rounded-l-md">
      <div className="space-y-3 text-left">
        <h2
          className="font-bold text-xl leading-snug"
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 700,
            fontStretch: 'condensed',
          }}
        >
          The future of commerce is less fee. More creativity.
        </h2>
        <p className="text-[12px] leading-relaxed text-gray-700">
          People and businesses lose tens of billions of dollars in transaction
          fees and countless hours in delays to the current system that they
          wouldn't with onchain payments.
        </p>
        <p className="text-[12px] leading-relaxed text-gray-700">
          We're updating the system so it's cheaper and faster.
        </p>
        <div className="flex flex-col pt-4">
          <p className="pt-2 pb-2 font-semibold text-[11px] tracking-wider text-gray-700">
            BUILD YOUR ONCHAIN STORE
          </p>
          <a
            href={GITHUB_LINK}
            className="flex cursor-pointer items-center text-gray-900"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-[11px] leading-relaxed">FORK THIS TEMPLATE</p>
            <span className="pl-1">
              <ExternalLinkSvg />
            </span>
          </a>
          <a
            href={ONCHAINKIT_LINK}
            className="flex cursor-pointer items-center pt-1 text-gray-900"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-[11px] leading-relaxed">VIEW DOCS</p>
            <span className="pl-1">
              <ExternalLinkSvg />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
