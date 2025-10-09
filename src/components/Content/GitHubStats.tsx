import { memo, useState, useEffect } from "react";
import { Github, Star, GitFork, Code, TrendingUp } from "lucide-react";
import styles from "./GitHubStats.module.css";

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
}

interface LanguageStats {
  [key: string]: number;
}

export const GitHubStats = memo(() => {
  const username = "AkBoy7";
  const githubUrl = `https://github.com/${username}`;

  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [languages, setLanguages] = useState<LanguageStats>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(
          `https://api.github.com/users/${username}`
        );
        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const user = await userResponse.json();
        setUserData(user);

        // Fetch repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
        );
        if (!reposResponse.ok) throw new Error("Failed to fetch repos");
        const reposData = await reposResponse.json();
        setRepos(reposData);

        // Calculate language statistics
        const langStats: LanguageStats = {};
        reposData.forEach((repo: GitHubRepo) => {
          if (repo.language) {
            langStats[repo.language] = (langStats[repo.language] || 0) + 1;
          }
        });
        setLanguages(langStats);

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching GitHub data:", err);
        setError("Failed to load GitHub data");
        setIsLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  // Calculate total stars and forks
  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

  // Get top languages with percentages
  const totalRepos = Object.values(languages).reduce((a, b) => a + b, 0);
  const topLanguages = Object.entries(languages)
    .map(([name, count]) => ({
      name,
      percentage: Math.round((count / totalRepos) * 100),
      color: getLanguageColor(name),
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);

  // Get featured repos (top 3 by stars)
  const featuredRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 3)
    .map((repo) => ({
      name: repo.name,
      description: repo.description || "No description available",
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language || "Unknown",
      url: repo.html_url,
    }));

  const stats = [
    {
      label: "Public Repos",
      value: isLoading ? "..." : userData?.public_repos || 0,
      icon: <Code size={24} />,
      color: "accent",
    },
    {
      label: "Total Stars",
      value: isLoading ? "..." : totalStars,
      icon: <Star size={24} />,
      color: "primary",
    },
    {
      label: "Total Forks",
      value: isLoading ? "..." : totalForks,
      icon: <GitFork size={24} />,
      color: "secondary",
    },
    {
      label: "Followers",
      value: isLoading ? "..." : userData?.followers || 0,
      icon: <TrendingUp size={24} />,
      color: "accent",
    },
  ];

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <Github size={48} />
          <p>{error}</p>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewButton}
          >
            View GitHub Profile
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Github size={48} className={styles.githubIcon} />
          <div>
            <h1 className={styles.title}>GitHub Statistics</h1>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.username}
            >
              @{username}
            </a>
          </div>
        </div>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.viewButton}
        >
          <Github size={20} />
          View Profile
        </a>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${styles.statCard} ${styles[stat.color]}`}
          >
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Most Used Languages</h2>
        <div className={styles.languagesContainer}>
          {topLanguages.map((lang) => (
            <div key={lang.name} className={styles.languageItem}>
              <div className={styles.languageHeader}>
                <span className={styles.languageName}>{lang.name}</span>
                <span className={styles.languagePercent}>
                  {lang.percentage}%
                </span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${lang.percentage}%`,
                    backgroundColor: lang.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {featuredRepos.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Featured Repositories</h2>
          <div className={styles.reposGrid}>
            {featuredRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.repoCard}
              >
                <h3 className={styles.repoName}>{repo.name}</h3>
                <p className={styles.repoDescription}>{repo.description}</p>
                <div className={styles.repoMeta}>
                  <span className={styles.repoLanguage}>{repo.language}</span>
                  <div className={styles.repoStats}>
                    <span className={styles.repoStat}>
                      <Star size={14} />
                      {repo.stars}
                    </span>
                    <span className={styles.repoStat}>
                      <GitFork size={14} />
                      {repo.forks}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
});

GitHubStats.displayName = "GitHubStats";

// Helper function to get language colors
function getLanguageColor(language: string): string {
  const colors: { [key: string]: string } = {
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    Python: "#3776ab",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    Go: "#00ADD8",
    Rust: "#dea584",
    Ruby: "#701516",
    PHP: "#4F5D95",
    Swift: "#ffac45",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    Vue: "#41b883",
    Jupyter: "#DA5B0B",
  };
  return colors[language] || "#8b8b8b";
}
