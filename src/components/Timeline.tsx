import { motion } from "framer-motion";
import { timelineEvents } from "../data/timeline";

export default function Timeline() {
  return (
    <section id="jornada" className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
      <p className="font-mono text-[11px] uppercase tracking-[2px] text-accent-green mb-2">
        jornada
      </p>
      <h2 className="text-[22px] font-semibold text-text-primary mb-10">Minha trajetória</h2>

      <div className="relative pl-8">
        <div className="absolute left-1 top-1 bottom-1 w-[2px] bg-border" />
        <ul className="space-y-8">
          {timelineEvents.map((ev, i) => (
            <motion.li
              key={`${ev.year}-${ev.title}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <span
                className="absolute -left-[30px] top-1 w-[10px] h-[10px] rounded-full border-2"
                style={{ backgroundColor: ev.color, borderColor: ev.color }}
              />
              <div
                className="font-mono text-[12px]"
                style={{ color: ev.color }}
              >
                {ev.year}
              </div>
              <div className="text-[14px] text-text-primary font-medium mt-1">{ev.title}</div>
              <div className="text-[12px] text-text-secondary mt-0.5">{ev.desc}</div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
