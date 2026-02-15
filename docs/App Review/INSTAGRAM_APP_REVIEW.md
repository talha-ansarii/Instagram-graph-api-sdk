# App Review for Instagram API

Your app must complete App Review before it can request permissions with **Advanced Access** from any app user. Features with Advanced Access are active for all app users only after approval.

---

## Development Scenarios

| Scenario | Login Type | Access Level | App Review Required? |
|----------|------------|--------------|----------------------|
| **Own Business Only** | None or Instagram Login | Standard | **No** |
| **Own Business Only** | None or Facebook Login | Standard | **No** |
| **Tech Provider (Multiple Businesses)** | Instagram Login | Advanced | **Yes** |
| **Tech Provider (Multiple Businesses)** | Facebook Login | Advanced | **Yes** |

---

## Available Permissions & Features

> [!IMPORTANT]
> Your app can use either **Facebook Login** or **Instagram Login**, but **not both**.

### Instagram API with Facebook Login
- `instagram_basic`, `instagram_content_publishing`, `instagram_manage_comments`, `instagram_manage_insights`, `instagram_manage_messages`.
- `ads_management`, `business_management`, `catalog_management`.
- `instagram_shopping_tag_products`, `instagram_public_content_access`.

### Instagram API with Instagram Login
- `instagram_business_basic`.
- `instagram_business_content_publishing`.
- `instagram_business_manage_comments`.
- `instagram_business_manage_messages`.

---

## Migrated Apps

If you are migrating from Facebook Login to Instagram Login, some permissions may be automatically granted Advanced Access.

| Facebook Login Permission | Instagram Login Equivalent |
|---------------------------|----------------------------|
| `instagram_basic` | `instagram_business_basic` |
| `instagram_content_publishing` | `instagram_business_content_publishing` |
| `instagram_manage_comments` | `instagram_business_manage_comments` |
| `instagram_manage_messages` | `instagram_business_manage_messages` |

---

## Start a Submission

To submit for App Review, go to the **Meta App Dashboard**:

1. In the left menu under **Products**, go to **Instagram > API setup with Instagram login**.
2. Click the chevron in the **Complete app review** section.
3. Review requested permissions and click **Continue to app review**.
4. Click **Edit** to trigger the review flow.

---

## Submission Action Items

- **Accessibility**: Confirm that your app can be loaded and tested externally.
- **Brand Guidelines**: Verify the login button is visible and adheres to guidelines.
- **Use Case Details**: Provide step-by-step descriptions of how users interact with your app.
- **Successful Calls**: You must make at least **1 successful API call** before requesting Advanced Access.

### App Settings Checklist
- [ ] **App Icon**: 1024x1024 pixels.
- [ ] **Privacy Policy URL**: Valid link for users to view your policy.
- [ ] **App Category**: Best represents your app's functionality.
- [ ] **Business Email**: Valid email for review results.

### Verification Details
Provide detailed instructions for reviewers to log in and test.
- Be specific about **when and how** each permission is used.
- Provide **test credentials** (usernames/passwords) if required.
- **Note**: Currently, only Web or Mobile Web platforms support Instagram API with Instagram Login.

---

## Screencast Guidance

For each permission, you must upload a screencast.

- **Language**: Use English for the app UI if possible.
- **Explanations**: Use captions, tool-tips, or voiceovers to explain buttons and UI elements.
- **Consistency**: Show the end-to-end user experience for the specific permission.

---

## See Also
- [Access Levels](https://developers.facebook.com/docs/graph-api/overview/access-levels/)
- [Best Practices for Meta App Review](https://developers.facebook.com/docs/app-review/best-practices/)
- [Common Mistakes](https://developers.facebook.com/docs/app-review/common-mistakes/)
- [Meta App Review Sample Submissions](https://developers.facebook.com/docs/app-review/sample-submissions/)
